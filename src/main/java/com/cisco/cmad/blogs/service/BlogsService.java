package com.cisco.cmad.blogs.service;

import java.util.ArrayList;
import java.util.List;

import com.cisco.cmad.blogs.api.Blog;
import com.cisco.cmad.blogs.api.BlogException;
import com.cisco.cmad.blogs.api.Blogs;
import com.cisco.cmad.blogs.api.DataNotFoundException;
import com.cisco.cmad.blogs.api.DuplicateDataException;
import com.cisco.cmad.blogs.api.InvalidDataException;
import com.cisco.cmad.blogs.data.BlogsDAO;
import com.cisco.cmad.blogs.data.BlogsDAOImpl;

public class BlogsService implements Blogs {

	private BlogsDAO dao = new BlogsDAOImpl();
	private static BlogsService blogsService = null;

	 private BlogsService() {
	    }
	 
	public static BlogsService getInstance() {
		if (blogsService == null) {
			blogsService = new BlogsService();
		}
		return blogsService;
	}

	@Override
	public void create(Blog blog) throws InvalidDataException, DuplicateDataException, BlogException {
		if (blog == null)
            throw new InvalidDataException();
        /*if (dao.read(blog.getBlogId()) != null)
            throw new DuplicateDataException();*/
        dao.create(blog);
	}

	@Override
	public Blog update(Blog updatedBlog) throws InvalidDataException, BlogException {
		 if (updatedBlog == null)
	            throw new InvalidDataException();
	        try {
	            dao.update(updatedBlog);
	        } catch (Exception e) {
	            throw new BlogException();
	        }
	        return updatedBlog;
	}

	@Override
	public void delete(long blogId) throws DataNotFoundException, BlogException {
		read(blogId);
        try {
            dao.delete(blogId);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BlogException();
        }
	}

	@Override
	public List<Blog> readByCategory(String category) throws DataNotFoundException, BlogException {
		List<Blog> blogs = new ArrayList<Blog>();
        try {
            blogs = dao.readByCategory(category);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BlogException();
        }

        if (blogs == null || blogs.isEmpty())
            throw new DataNotFoundException();
        return blogs;
	}

	@Override
	public List<Blog> readAllBlogs(int offset, int count, String category) throws DataNotFoundException, BlogException {
		 List<Blog> blogs = new ArrayList<Blog>();
	        try {
	            blogs = dao.readAllBlogs(offset, count, category);
	        } catch (Exception e) {
	            e.printStackTrace();
	            throw new BlogException();
	        }

	        if (blogs == null || blogs.isEmpty())
	            throw new DataNotFoundException();
	        return blogs;
	}

	@Override
	public Blog read(long blogId) throws DataNotFoundException, BlogException {
		Blog blog = null;
		try {
	            blog = dao.read(blogId);
	        } catch (Exception e) {
	            e.printStackTrace();
	            throw new BlogException();
	        }

	        if (blog == null)
	            throw new DataNotFoundException();

	        return blog;
	}

	@Override
	public List<Blog> readByUserId(String userId) throws DataNotFoundException, BlogException {
		 List<Blog> blogs = new ArrayList<Blog>();
	        try {
	            blogs = dao.readByUserId(userId);
	        } catch (Exception e) {
	            e.printStackTrace();
	            throw new BlogException();
	        }

	        if (blogs == null || blogs.isEmpty())
	            throw new DataNotFoundException();
	        return blogs;
	}

	@Override
	public long getUpVote(long blogId) throws DataNotFoundException, BlogException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long getDownVote(long blogId) throws DataNotFoundException, BlogException {
		// TODO Auto-generated method stub
		return 0;
	}

}
