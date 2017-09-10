package com.cisco.cmad.blogs.data;

import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.cisco.cmad.blogs.api.User;
import com.cisco.cmad.blogs.util.Constants;
import com.cisco.cmad.jwt.utils.PasswordUtils;
import com.mongodb.MongoClient;

public class UsersDAOImpl extends BasicDAO<User, String> implements UsersDAO {

	public static MongoClient mongoClient = new MongoClient("172.31.39.116:27017");
	//public static MongoClient mongoClient = new MongoClient("192.168.99.1:27017");
	public static Morphia morphia = new Morphia();
	public static Datastore datastore = morphia.createDatastore(mongoClient, "cmad_blog");

    public UsersDAOImpl() {
        this(User.class, datastore);
    }

	public UsersDAOImpl(Class<User> entityClass, Datastore ds) {
		super(entityClass, ds);
	}

	@Override
	public void create(User user) {
		try {
	        save(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public User read(String userName) {
        User user = findOne("_id", userName);
        return user;
	}

	@Override
	public User readByUserIdAndPassword(String userName, String password) {
		User user = createQuery().field("_id").contains(userName).field("password").contains(password).get();
		return user;
	}

	@Override
	public List<User> readAllUsers() {
        List<User> users = createQuery().asList();
        return users;
	}

	@Override
	public void update(User updatedUser) {
        User temp = read(updatedUser.getUserName());
		temp.setFirstName(updatedUser.getFirstName());
		temp.setLastName(updatedUser.getLastName());
		temp.setEmailId(updatedUser.getEmailId());
		temp.setPassword(updatedUser.getPassword());
        save(temp);
	}

	@Override
	public void delete(String userName) {
        User user = read(userName);
        delete(user);
	}
}
