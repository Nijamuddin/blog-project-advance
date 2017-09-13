package com.cisco.cmad.blogs.api;

import javax.ws.rs.core.Response;

@SuppressWarnings("serial")
public class DataNotFoundException extends BlogException {

    public DataNotFoundException() {
    }

    public DataNotFoundException(String message) {
        super(message);
    }

    public DataNotFoundException(Throwable cause) {
        super(cause);
    }

    public DataNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public DataNotFoundException(String message, Throwable cause, boolean enableSuppression,
            boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

	@Override
	public Response toResponse(BlogException arg0) {
		return Response.status(Response.Status.NO_CONTENT).build();
	}
}
