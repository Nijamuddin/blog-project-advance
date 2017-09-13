package com.cisco.cmad.blogs.api;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

@SuppressWarnings("serial")
public class BlogException extends RuntimeException implements ExceptionMapper<BlogException> {

    public BlogException() {
    }

    public BlogException(String message) {
        super(message);
    }

    public BlogException(Throwable cause) {
        super(cause);
    }

    public BlogException(String message, Throwable cause) {
        super(message, cause);
    }

    public BlogException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

	@Override
	public Response toResponse(BlogException arg0) {
		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
	}
}
