package com.cisco.cmad.blogs.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.cisco.cmad.blogs.api.Blog;
import com.cisco.cmad.blogs.api.BlogException;
import com.cisco.cmad.blogs.api.Blogs;
import com.cisco.cmad.blogs.api.Comment;
import com.cisco.cmad.blogs.api.Comments;
import com.cisco.cmad.blogs.api.DataNotFoundException;
import com.cisco.cmad.blogs.api.DuplicateDataException;
import com.cisco.cmad.blogs.api.InvalidDataException;
import com.cisco.cmad.blogs.service.BlogsService;
import com.cisco.cmad.blogs.service.CommentsService;

@Path("/blogs/{blogid}/comments")
public class CommentsController {

	private static Comments commentService = CommentsService.getInstance();
	private static Blogs blogService = BlogsService.getInstance();
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAll(@PathParam("blogid") int blogid) {
		List<Comment> comments = commentService.readAllByBlogId(blogid);
		return Response.ok().entity(comments).build();
	}

	@GET
	@Path("/count")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCount(@PathParam("blogid") int blogid) {
		long count = commentService.readCountByBlogId(blogid);
		return Response.ok().entity(count).build();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@JwtTokenExpected
	public Response create(@PathParam("blogid") int blogid, Comment comment) {
		Blog blog = blogService.read(blogid);
		comment.setBlogId(blogid);
		commentService.create(comment);
		return Response.status(Response.Status.CREATED).build();
	}

	// INFO should have been PATCH - but JERSY does not support PATCH and hence
	// using POST
	@POST
	@Path("/{commentid}")
	@Consumes(MediaType.APPLICATION_JSON)
	@JwtTokenExpected
	public Response update(@PathParam("blogid") int blogid, @PathParam("commentid") int commentid, Comment comment) {
		commentService.update(comment);
		return Response.ok().build();
	}

	@DELETE
	@Path("/{commentid}")
	@JwtTokenExpected
	public Response delete(@PathParam("blogid") int blogid, @PathParam("commentid") int commentid) {
		commentService.delete(commentid);
		return Response.ok().build();
	}

	@PUT
	@Path("/{commentid}/upvote")
	@JwtTokenExpected
	public Response doUpvote(@PathParam("blogid") int blogid, @PathParam("commentid") int commentid) {
		Comment comment = commentService.read(commentid);
		int upvote = comment.getUpVote();
		upvote++;
		comment.setUpVote(upvote);
		commentService.update(comment);
		return Response.ok().build();
	}

	@DELETE
	@Path("/{commentid}/upvote")
	@JwtTokenExpected
	public Response undoUpvote(@PathParam("blogid") int blogid, @PathParam("commentid") int commentid) {
		Comment comment = commentService.read(commentid);
		int upvote = comment.getUpVote();
		if (upvote > 0) upvote--;
		comment.setUpVote(upvote);
		commentService.update(comment);
		return Response.ok().build();
	}

	@PUT
	@Path("/{commentid}/downvote")
	@JwtTokenExpected
	public Response doDownvote(@PathParam("blogid") int blogid, @PathParam("commentid") int commentid) {
		Comment comment = commentService.read(commentid);
		int downvote = comment.getDownVote();
		downvote++;
		comment.setDownVote(downvote);
		commentService.update(comment);
		return Response.ok().build();
	}

	@DELETE
	@Path("/{commentid}/downvote")
	@JwtTokenExpected
	public Response undoDownvote(@PathParam("blogid") int blogid, @PathParam("commentid") int commentid) {
		Comment comment = commentService.read(commentid);
		int downvote = comment.getDownVote();
		if (downvote > 0) downvote--;
		comment.setDownVote(downvote);
		commentService.update(comment);
		return Response.ok().build();
	}
}
