package com.cisco.cmad.blogs.api;

import javax.ws.rs.core.Response;

@SuppressWarnings("serial")
public class DuplicateDataException extends BlogException {

    public DuplicateDataException() {
    }

    public DuplicateDataException(String message) {
        super(message);
    }

    public DuplicateDataException(Throwable cause) {
        super(cause);
    }

    public DuplicateDataException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicateDataException(String message, Throwable cause, boolean enableSuppression,
            boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

	@Override
	public Response toResponse(BlogException arg0) {
		return Response.status(Response.Status.CONFLICT).build();
	}
}
