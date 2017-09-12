package com.cisco.cmad.blogs.rest;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.cisco.cmad.blogs.api.Blog;
import com.cisco.cmad.blogs.api.BlogException;
import com.cisco.cmad.blogs.api.Blogs;
import com.cisco.cmad.blogs.api.DataNotFoundException;
import com.cisco.cmad.blogs.api.DuplicateDataException;
import com.cisco.cmad.blogs.api.InvalidDataException;
import com.cisco.cmad.blogs.service.BlogsService;

@Path("/blogs")
public class BlogsController {
	private Blogs blogsService = BlogsService.getInstance();
   
    @GET
    @Path("/{blogId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response read(@PathParam("blogId") long blogId) {
        Blog blog = blogsService.read(blogId);
        return Response.ok().entity(blog).build();
    }

    // TODO: fix using a brute force scan
	@GET
    @Path("/category/{category}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response readCategory(@PathParam("category") String category) {
        List<Blog> blogs = blogsService.readByCategory(category);
        Set<String> results = new HashSet<String>();
        for (int i = 0; i < blogs.size(); i++) {
            results.add(blogs.get(i).getCategory());
        }
        if (blogs.size() > 0) {
            return Response.ok().entity(results).build();
        }
        return Response.status(Response.Status.NO_CONTENT).build();
    }

	@GET
    @Path("/authored")
    @Produces(MediaType.APPLICATION_JSON)
    public Response readAllAuthored(@QueryParam("author") String author) {
        List<Blog> blogs = blogsService.readByUserId(author);
        return Response.ok().entity(blogs).build();
    }

	@GET
    @Path("/category")
    @Produces(MediaType.APPLICATION_JSON)
    public Response readAllCategory() {
        List<Blog> blogs = blogsService.readByCategory("");
        Set<String> results = new HashSet<String>();
        for (int i = 0; i < blogs.size(); i++) {
            results.add(blogs.get(i).getCategory());
        }
        if (blogs.size() > 0) {
            return Response.ok().entity(results).build();
        }
        return Response.status(Response.Status.NO_CONTENT).build();
    }

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll(@QueryParam("offset") int offset, @QueryParam("count") int count, @QueryParam("category") String category) {
		try {
			List<Blog> blogs = blogsService.readAllBlogs(offset, count, category);
			return Response.ok().entity(blogs).build();
		} catch (DataNotFoundException dnfe) {
			return Response.status(Response.Status.NO_CONTENT).build();
		} catch (BlogException be) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@JwtTokenExpected
	public Response create(Blog blog) {
		try {
			blogsService.create(blog);
			return Response.status(Response.Status.CREATED).build();
		} catch (InvalidDataException ide) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		} catch (DuplicateDataException dde) {
			return Response.status(Response.Status.CONFLICT).build();
		} catch (BlogException be) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	// INFO should have been PATCH - but JERSY does not support PATCH and hence
	// using POST
	@POST
	@Path("/{blogid}")
	@Consumes(MediaType.APPLICATION_JSON)
	@JwtTokenExpected
	public Response update(@PathParam("blogid") int blogid, Blog blog) {
		try {
			blogsService.update(blog);
			return Response.ok().build();
		} catch (InvalidDataException ide) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		} catch (BlogException be) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{blogid}")
	@JwtTokenExpected
	public Response delete(@PathParam("blogid") int blogid) {
		try {
			blogsService.delete(blogid);
			return Response.ok().build();
		} catch (DataNotFoundException dnfe) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		} catch (BlogException be) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{blogid}/upvote")
	@JwtTokenExpected
	public Response doUpvote(@PathParam("blogid") int blogid) {
		try {
			Blog blog = blogsService.read(blogid);
			int upvote = blog.getUpVote();
			upvote++;
			blog.setUpVote(upvote);
			blogsService.update(blog);
			return Response.ok().build();
		} catch (DataNotFoundException dnfe) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		} catch (InvalidDataException ide) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		} catch (BlogException be) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{blogid}/upvote")
	@JwtTokenExpected
	public Response undoUpvote(@PathParam("blogid") int blogid) {
		try {
			Blog blog = blogsService.read(blogid);
			int upvote = blog.getUpVote();
			if (upvote > 0) upvote--;
			blog.setUpVote(upvote);
			blogsService.update(blog);
			return Response.ok().build();
		} catch (DataNotFoundException dnfe) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		} catch (InvalidDataException ide) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		} catch (BlogException be) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{blogid}/downvote")
	@JwtTokenExpected
	public Response doDownvote(@PathParam("blogid") int blogid) {
		try {
			Blog blog = blogsService.read(blogid);
			int downvote = blog.getDownVote();
			downvote++;
			blog.setDownVote(downvote);
			blogsService.update(blog);
			return Response.ok().build();
		} catch (DataNotFoundException dnfe) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		} catch (InvalidDataException ide) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		} catch (BlogException be) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{blogid}/downvote")
	@JwtTokenExpected
	public Response undoDownvote(@PathParam("blogid") int blogid) {
		try {
			Blog blog = blogsService.read(blogid);
			int downvote = blog.getDownVote();
			if (downvote > 0) downvote--;
			blog.setDownVote(downvote);
			blogsService.update(blog);
			return Response.ok().build();
		} catch (DataNotFoundException dnfe) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		} catch (InvalidDataException ide) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		} catch (BlogException be) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}
}
