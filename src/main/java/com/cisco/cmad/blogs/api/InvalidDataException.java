package com.cisco.cmad.blogs.api;

import javax.ws.rs.core.Response;

@SuppressWarnings("serial")
public class InvalidDataException extends BlogException {

    public InvalidDataException() {
    }

    public InvalidDataException(String message) {
        super(message);
    }

    public InvalidDataException(Throwable cause) {
        super(cause);
    }

    public InvalidDataException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidDataException(String message, Throwable cause, boolean enableSuppression,
            boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

	@Override
	public Response toResponse(BlogException arg0) {
		return Response.status(Response.Status.BAD_REQUEST).build();
	}
}
