package com.bptn.weatherapp.controller;

import static org.hamcrest.CoreMatchers.is;

import com.bptn.weatherapp.jpa.User;
import com.bptn.weatherapp.repository.UserRepository;
import com.bptn.weatherapp.security.JwtService;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserControllerTest {

	User user;
	String otherUsername;
	String otherPassword;

	@Autowired
	MockMvc mockMvc;

	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	JwtService jwtService;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@BeforeEach
	public void setup() {

		this.user = new User();

		this.user.setFirstName("Jackson");
		this.user.setLastName("Miller");
		this.user.setUsername("jacksonmiller");
		this.user.setPassword("mypassword1");
		this.user.setPhone("987654322");
		this.user.setEmailId("jacksonmiller@example.com");

		this.otherUsername = "jessiemiller";
		this.otherPassword = "mypassword2";
	}

	@Test
	@Order(1)
	public void signupIntegrationTest() throws Exception {
		ObjectMapper objectMapper = JsonMapper.builder().disable(MapperFeature.USE_ANNOTATIONS).build();

		this.mockMvc.perform(MockMvcRequestBuilders.post("/user/signup")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(user)))
		.andExpect(status().isOk()).andExpect(jsonPath("$.firstName", is(this.user.getFirstName())))
		.andExpect(jsonPath("$.lastName", is(this.user.getLastName())))
		.andExpect(jsonPath("$.username", is(this.user.getUsername())))
		.andExpect(jsonPath("$.phone", is(this.user.getPhone())))
		.andExpect(jsonPath("$.emailId", is(this.user.getEmailId())));

		Optional<User> opt = this.userRepository.findByUsername(this.user.getUsername());
		assertTrue(opt.isPresent(), "User Should Exist");
		assertEquals(1, opt.get().getUserId());
		assertEquals(this.user.getFirstName(), opt.get().getFirstName());
		assertEquals(this.user.getLastName(), opt.get().getLastName());
		assertEquals(this.user.getUsername(), opt.get().getUsername());
		assertEquals(this.user.getPhone(), opt.get().getPhone());
		assertEquals(this.user.getEmailId(), opt.get().getEmailId());
		assertEquals(false, opt.get().getEmailVerified());

		assertTrue(this.passwordEncoder.matches(this.user.getPassword(), opt.get().getPassword()));
	}

	@Test
	@Order(2)
	public void signupUsernameExistsIntegrationTest() throws Exception {

		ObjectMapper objectMapper = JsonMapper.builder().disable(MapperFeature.USE_ANNOTATIONS).build();

		this.mockMvc.perform(MockMvcRequestBuilders.post("/user/signup")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(this.user)))
		.andExpect(status().is4xxClientError())
		.andExpect(jsonPath("$.httpStatusCode", is(400)))
		.andExpect(jsonPath("$.httpStatus", is("BAD_REQUEST")))
		.andExpect(jsonPath("$.reason", is("BAD REQUEST")))
		.andExpect(jsonPath("$.message",

				is(String.format("Username already exists, %s", this.user.getUsername()))));
	}

	@Test
	@Order(3)
	public void signupEmailExistsIntegrationTest() throws Exception {

		ObjectMapper objectMapper = JsonMapper.builder().disable(MapperFeature.USE_ANNOTATIONS).build();

		this.user.setUsername(this.otherUsername);
		this.mockMvc.perform(MockMvcRequestBuilders.post("/user/signup")
				.contentType(MediaType.APPLICATION_JSON)
				//Unsure if this line is needed
				.content(objectMapper.writeValueAsString(this.user)))
		.andExpect(status().is4xxClientError())
		.andExpect(jsonPath("$.httpStatusCode", is(400)))
		.andExpect(jsonPath("$.httpStatus", is("BAD_REQUEST")))
		.andExpect(jsonPath("$.reason", is("BAD REQUEST")))
		.andExpect(jsonPath("$.message", is(String.format("Email already exists, %s", this.user.getEmailId()))));
	}

	@Test
	@Order(4)
	public void verifyEmailIntegrationTest() throws Exception {

		/* Check if the User exists */
		Optional<User> opt = this.userRepository.findByUsername(this.user.getUsername());
		assertTrue(opt.isPresent(), "User Should Exist");

		/* Check the user emailVerified flag initial value */
		assertEquals(false, opt.get().getEmailVerified());

		String jwt = String.format("Bearer %s", this.jwtService.generateJwtToken(this.user.getUsername(), 10_000));

		/* Check the Rest End Point Response */
		this.mockMvc.perform(MockMvcRequestBuilders.get("/user/verify/email").header(AUTHORIZATION, jwt)).andExpect(status().isOk());

		/* Check if the User exists */
		opt = this.userRepository.findByUsername(this.user.getUsername());
		assertTrue(opt.isPresent(), "User Should Exist");

		/* Check the user emailVerified flag was updated */
		assertEquals(true, opt.get().getEmailVerified());

	}

	@Test
	@Order(5)
	public void verifyEmailUsernameNotFoundIntegrationTest() throws Exception {

		/* Check if the User exists */
		Optional<User> opt = this.userRepository.findByUsername(this.otherUsername);
		assertTrue(opt.isEmpty(), "User Should Not Exist");

		String jwt = String.format("Bearer %s", this.jwtService.generateJwtToken(this.otherUsername, 10_000));

		/* Check the Rest End Point Response */		this.mockMvc.perform(MockMvcRequestBuilders.get("/user/verify/email").header(AUTHORIZATION, jwt))
		.andExpect(status().is4xxClientError()).andExpect(jsonPath("$.httpStatusCode", is(400)))
		.andExpect(jsonPath("$.httpStatus", is("BAD_REQUEST")))
		.andExpect(jsonPath("$.reason", is("BAD REQUEST")))
		.andExpect(jsonPath("$.message", is(String.format("Username doesn't exist, %s", this.otherUsername))));

	}

	@Test
	@Order(6) /* Checks if login endpoint is working - Can a user login successfully? */
	public void loginIntegrationTest() throws Exception {

		/* Calls a method within the ObjectNode class that creates a JSON object */
		ObjectNode root = this.objectMapper.createObjectNode();

		//Inserts the username and password into their respective JSON fields
		root.put("username", this.user.getUsername());
		root.put("password", this.user.getPassword());

		//MockMvc (virtual server) calls the UserController to map the HTTP endpoints
		this.mockMvc.perform(MockMvcRequestBuilders.post("/user/login")
				.contentType(MediaType.APPLICATION_JSON)
				.content(this.objectMapper.writeValueAsString(root)))

		// Checks that the server response matches our expected server response
		.andExpect(header().exists(AUTHORIZATION))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$.firstName", is(this.user.getFirstName())))
		.andExpect(jsonPath("$.lastName", is(this.user.getLastName())))
		.andExpect(jsonPath("$.username", is(this.user.getUsername())))
		.andExpect(jsonPath("$.phone", is(this.user.getPhone())))
		.andExpect(jsonPath("$.emailId", is(this.user.getEmailId())))
		.andExpect(jsonPath("$.emailVerified", is(true)));
	}

	@Test
	@Order(7) /* Checks if the email used to log in is not verified */
	public void loginEmailNotVerifiedIntegrationTest() throws Exception {

		/* Assigning the value of this.objectMapper to the root variable */
		ObjectNode root = this.objectMapper.createObjectNode();

		//Sets the current user's username and password to the root object
		root.put("username", this.user.getUsername());
		root.put("password", this.user.getPassword());

		/* Check if the User exists */
		Optional<User> opt = this.userRepository.findByUsername(this.user.getUsername());
		//The user should exist, if assertTrue returns false, error message "user should exist" is thrown
		assertTrue(opt.isPresent(), "User Should Exist");  

		// If the user is present, set the user's email verified flag to False
		opt.ifPresent(u -> {u.setEmailVerified(false);
		this.userRepository.save(u);});

		// mockMvc (virtual server) maps POST endpoint
		this.mockMvc.perform(MockMvcRequestBuilders.post("/user/login")
				.contentType(MediaType.APPLICATION_JSON)
				.content(this.objectMapper.writeValueAsString(root)))

		//Checks that our server response matches our expected server results (400 error)
		//We don't want user's without verified email's to be able to log in
		.andExpect(status().is4xxClientError())
		.andExpect(jsonPath("$.httpStatusCode", is(400)))
		.andExpect(jsonPath("$.httpStatus", is("BAD_REQUEST")))
		.andExpect(jsonPath("$.reason", is("BAD REQUEST")))
		.andExpect(jsonPath("$.message", is(String.format("Email requires verification, %s", this.user.getEmailId()))));

		// Making sure that the user who's email is not verified has an account on this DB
		opt = this.userRepository.findByUsername(this.user.getUsername());
		assertTrue(opt.isPresent(), "User Should Exist");  

	}

	@Test
	@Order(8) 
	public void resetPasswordEmailIntegrationTest() throws Exception {

		this.mockMvc.perform(MockMvcRequestBuilders.get("/user/reset/{email}", this.user.getEmailId() ) ).andExpect(status().isOk());
		// this.mockMvc.perform(MockMvcRequestBuilders.get("/user/reset/{ email, this.user.getEmailId() }")	
		// this.mockMvc.perform(MockMvcRequestBuilders.get("/user/verify/email").header(AUTHORIZATION, jwt)).andExpect(status().isOk());
		// .contentType(MediaType.APPLICATION_JSON)
		// .content(this.objectMapper.writeValueAsString(root)))

	}

	@Test
	@Order(9)
	public void resetPasswordIntegrationTest() throws Exception {

		// here we get the user from repository, check if user exists and get their password also
		Optional<User> opt = this.userRepository.findByUsername(this.user.getUsername());
		assertTrue(opt.isPresent(), "User Should Exist");
		assertTrue(this.passwordEncoder.matches(this.user.getPassword(), opt.get().getPassword()));

		//generate JWT token because we are starting new session to reset password
		String jwt = String.format("Bearer %s", this.jwtService.generateJwtToken(this.user.getUsername(), 10_000));

		// we need to put new password as request parameter
		//reset the password here as post sent to mock server
		this.mockMvc.perform(MockMvcRequestBuilders.post("/user/reset")
				.param("password", this.otherPassword) // request parameter for reset password 
				.header(AUTHORIZATION, jwt))
		.andExpect(status().isOk());

		//we go back to get the user and then check the password the user has

		opt = this.userRepository.findByUsername(this.user.getUsername());
		assertTrue(opt.isPresent(), "User Should Exist");
		assertTrue(this.passwordEncoder.matches(this.otherPassword, opt.get().getPassword()));

	}


}
