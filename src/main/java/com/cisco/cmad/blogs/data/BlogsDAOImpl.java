package com.cisco.cmad.blogs.data;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.cisco.cmad.blogs.api.Blog;
import com.mongodb.MongoClient;

public class BlogsDAOImpl extends BasicDAO<Blog, Long> implements BlogsDAO {

	public static MongoClient mongoClient = new MongoClient("172.31.39.116:27017");
	public static Morphia morphia = new Morphia();
	public static Datastore datastore = morphia.createDatastore(mongoClient, "cmad_blog");
	private static final AtomicInteger index = new AtomicInteger(0);

    public BlogsDAOImpl() {
        this(Blog.class, datastore);
    }

	public BlogsDAOImpl(Class<Blog> entityClass, Datastore ds) {
		super(entityClass, ds);
	}

	@Override
	public void create(Blog blog) {
		try {
			blog.setBlogId(index.incrementAndGet());
	        save(blog);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public Blog read(long blogId) {
        Blog blog = findOne("_id", blogId);
        return blog;
	}

	@Override
	public List<Blog> readByCategory(String category) {
		List<Blog> blogs = createQuery().filter("category", category).order("-lastUpdatedOn").asList();
		return blogs;
	}

	@Override
	public List<Blog> readAllBlogs() {
        List<Blog> blogs = createQuery().order("-lastUpdatedOn").asList();
        return blogs;
	}

	@Override
	public List<Blog> readByUserId(String userId) {
        List<Blog> blogs = createQuery().filter("author", userId).order("-lastUpdatedOn").asList();
        return blogs;
	}

	@Override
	public void update(Blog blog) {
        Blog temp = read(blog.getBlogId());
		temp.setBlogContent(blog.getBlogContent());
		temp.setTitle(blog.getTitle());
		temp.setUpVote(blog.getUpVote());
		temp.setDownVote(blog.getDownVote());
		temp.setCategory(blog.getCategory());
        save(temp);
    }

	@Override
	public void delete(long blogId) {
        Blog blog = read(blogId);
        delete(blog);
	}
}
