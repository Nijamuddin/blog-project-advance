package com.cisco.cmad.blogs.api;

import java.util.List;

import javax.ws.rs.QueryParam;

public interface Blogs {

	public void create(Blog blog) throws InvalidDataException, DuplicateDataException, BlogException;

	public Blog update(Blog updatedBlog) throws InvalidDataException, BlogException;

	public void delete(long blogId) throws DataNotFoundException, BlogException;

	public List<Blog> readByCategory(String category) throws DataNotFoundException, BlogException;

	public List<Blog> readAllBlogs(int offset, int count, String category) throws DataNotFoundException, BlogException;

	public Blog read(long blogId) throws DataNotFoundException, BlogException;

	public List<Blog> readByUserId(String userId) throws DataNotFoundException, BlogException;

	public long getUpVote(long blogId) throws DataNotFoundException, BlogException;

	public long getDownVote(long blogId) throws DataNotFoundException, BlogException;

}
