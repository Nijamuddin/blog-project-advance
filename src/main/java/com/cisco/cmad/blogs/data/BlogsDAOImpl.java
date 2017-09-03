package com.cisco.cmad.blogs.data;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Pattern;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.FindOptions;

import com.cisco.cmad.blogs.api.Blog;
import com.mongodb.MongoClient;

public class BlogsDAOImpl extends BasicDAO<Blog, Long> implements BlogsDAO {

	//public static MongoClient mongoClient = new MongoClient("172.31.39.116:27017");
	public static MongoClient mongoClient = new MongoClient("192.168.99.1:27017");
	public static Morphia morphia = new Morphia();
	public static Datastore datastore = morphia.createDatastore(mongoClient, "cmad_blog");
	private static final AtomicInteger index = new AtomicInteger(0);

    public BlogsDAOImpl() {
        this(Blog.class, datastore);
        Blog blog = findOne(createQuery().order("-blogId"));
        if (blog != null) {
            index.set((int)blog.getBlogId());
        }
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
		if (category.isEmpty()) {
			List<Blog> blogs = createQuery().asList();
			return blogs;
		}
		else {
			Pattern regexp = Pattern.compile(category, Pattern.CASE_INSENSITIVE);
			List<Blog> blogs = createQuery().filter("category", regexp).asList();
			return blogs;
		}
	}

	@Override
	public List<Blog> readAllBlogs(int offset, int count, String category) {
		List<Blog> blogs;
		if (category != null) {
			if (count != 0) {
				FindOptions options = new FindOptions();
				options.skip(offset * count).limit(count);
				blogs = createQuery().filter("category", category).order("-lastUpdatedOn").asList(options);
			}
			else {
				blogs = createQuery().filter("category", category).order("-lastUpdatedOn").asList();
			}
		}
		else {
			if (count != 0) {
				FindOptions options = new FindOptions();
				options.skip(offset * count).limit(count);
				blogs = createQuery().order("-lastUpdatedOn").asList(options);
			}
			else {
				blogs = createQuery().order("-lastUpdatedOn").asList();
			}
		}
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
