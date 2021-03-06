//var URLBase = "http://web-lb-1363649479.us-west-2.elb.amazonaws.com/cmad-blog-project-advance/";
var URLBase = "";//http://192.168.99.100:8080/cmad-blog-project-advance/";
var blogsPerPage = 4
var currentPageOffset = 0

function getBlogsWithCategory(category, offset, callback) {
    var url = URLBase + "public/blogs?count=" + blogsPerPage + "&offset=" + offset + "&category=" + category;
    currentPageOffset = offset;

    $.getJSON(url, function(blogs) {
        var length = blogs.length;
        $.each(blogs, function(index, blog) {
            var countUrl = URLBase + "public/blogs/" + blog.blogId + "/comments/count";
            $.get(countUrl, function(count) {
                blog.comments = count;
                // make callback only on the last entry in the list
                if (index === length - 1) {
                    callback(blogs);
                }
            });
        });
    })
}

function getBlogs(offset, callback) {
    var url = URLBase + "public/blogs?count=" + blogsPerPage + "&offset=" + offset;
    currentPageOffset = offset;

    $.getJSON(url, function(blogs) {
        var length = blogs.length;
        $.each(blogs, function(index, blog) {
            var countUrl = URLBase + "public/blogs/" + blog.blogId + "/comments/count";
            $.get(countUrl, function(count) {
                blog.comments = count;
                // make callback only on the last entry in the list
                if (index === length - 1) {
                    callback(blogs);
                }
            });
        });
    })
}

function getBlogsAuthored(author, callback) {
    var url = URLBase + "public/blogs/authored?author=" + author;
    currentPageOffset = 0;

    $.getJSON(url, function(blogs) {
        var length = blogs.length;
        $.each(blogs, function(index, blog) {
            var countUrl = URLBase + "public/blogs/" + blog.blogId + "/comments/count";
            $.get(countUrl, function(count) {
                blog.comments = count;
                // make callback only on the last entry in the list
                if (index === length - 1) {
                    callback(blogs);
                }
            });
        });
    })
}

function getBlog(blogId, callback) {
    var url = URLBase + "public/blogs/" + blogId;

    $.getJSON(url, function(blog) {
        var countUrl = URLBase + "public/blogs/" + blog.blogId + "/comments/count";
        $.get(countUrl, function(count) {
            blog.comments = count;
            callback(blog);
        });
    })
}

function upvoteBlog(blogId, auth, callback) {
    $.ajax({
        url: URLBase + "public/blogs/" + blogId + "/upvote",
        type: 'PUT',
        headers: {
            "Authorization": auth
        },
        complete: function(jqXHR, textStatus) {
            callback(jqXHR.status);
        }
    });
}

function downvoteBlog(blogId, auth, callback) {
    $.ajax({
        url: URLBase + "public/blogs/" + blogId + "/downvote",
        type: 'PUT',
        headers: {
            "Authorization": auth
        },
        complete: function(jqXHR, textStatus) {
            callback(jqXHR.status);
        }
    });
}

function createBlog(title, content, category, author, auth, callback) {
    var url = URLBase + "public/blogs/";
    var blog = {
        "title": title,
        "blogContent": content,
        "category": category,
        "upVote": 0,
        "downVote": 0,
        "author": author
    };

    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(blog),
        dataType: "json",
        headers: {
            "Authorization": auth
        },
        contentType: "application/json; charset=utf-8",
        complete: function(jqXHR, textStatus) {
            callback(jqXHR.status);
        }
    });
}

function getComments(blogId, callback) {
    var url = URLBase + "public/blogs/" + blogId + "/comments/";

    $.getJSON(url, function(comments) {
        callback(comments);
    })
}

function createComment(commentText, author, blogId, auth, callback) {
    var url = URLBase + "public/blogs/" + blogId + "/comments";
    var comments = {
        "commentText": commentText,
        "upVote": 0,
        "downVote": 0,
        "author": author,
        "blogId": blogId
    };

    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(comments),
        dataType: "json",
        headers: {
            "Authorization": auth
        },
        contentType: "application/json; charset=utf-8",
        complete: function(jqXHR, textStatus) {
            callback(jqXHR.status);
        }
    });
}

function signupUser(signupFirstName, signupLastName, signupEMail, signupUserName, signupPassword, callback) {
    var url = URLBase + "public/users";
    var data = {
        userName: signupUserName,
        password: signupPassword,
        firstName: signupFirstName,
        lastName: signupLastName,
        emailId: signupEMail
    };

    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        complete: function(jqXHR, textStatus) {
            switch (jqXHR.status) {
                case 200:
                case 201:
                    callback(jqXHR.getResponseHeader("Authorization"));
                    break;
                default:
                    callback(null);
                    break;
            }
        }
    });
}

function authenticateUser(username, password, callback) {
    var url = URLBase + "public/users/authenticateUser";
    var data = {
        userName: username,
        password: password
    };

    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        complete: function(jqXHR, textStatus) {
            switch (jqXHR.status) {
                case 200:
                case 201:
                    // TODO: revert - needed since we are testing with CORS
                    callback(jqXHR.getResponseHeader("Authorization"));
                    //callback("Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImlzcyI6Imh0dHA6Ly8xOTIuMTY4Ljk5LjEwMDo4MDgwL2NtYWQtYmxvZy1wcm9qZWN0LWFkdmFuY2UvcHVibGljL3VzZXJzL2F1dGhlbnRpY2F0ZVVzZXIiLCJpYXQiOjE1MDM3NDkwNjAsImV4cCI6MTUwMzc1MDI2MH0.KckuIb7NFOW-DwUCKCVB2P4VfzOccEJa4nIrjw3R9eISHoHjOG2wo_Np2a9EYvC_uupU-JYBVoLsuccRX2Qn0Q");
                    break;
                default:
                    callback(null);
                    break;
            }
        }
    });
}

function getSuggestions(callback) {
    var url = URLBase + "public/blogs/category";

    $.getJSON(url, function(categories) {
        callback(categories);
    })
}

function filterSuggestions(filter, callback) {
    var url = URLBase + "public/blogs/category/" + filter;

    $.getJSON(url, function(categories) {
        callback(categories);
    })
}

function getBlogUrl(query) {
    if (query.offset === undefined) {
        query.offset = 0;
    }

    if ((query.category === "") || (query.category === undefined)) {
        return '/cmad-blog-project-advance/blogs?offset=' + query.offset;
    }

    return '/cmad-blog-project-advance/blogs?offset=' + query.offset + "&category=" + query.category;
}

function getNextBlogUrl(query) {
    if (query.offset === undefined) {
        query.offset = 0;
    }

    query.offset = Number(query.offset) + 1;
    return getBlogUrl(query);
}

function getPrevBlogUrl(query) {
    if (query.offset === undefined) {
        query.offset = 0;
    }

    if (Number(query.offset) === 0) {
        return null;
    }

    query.offset = Number(query.offset) - 1;
    return getBlogUrl(query);
}

module.exports = {
    getBlogs: getBlogs,
    getBlogsWithCategory: getBlogsWithCategory,
    getBlog: getBlog,
    getComments: getComments,
    authenticateUser: authenticateUser,
    upvoteBlog: upvoteBlog,
    downvoteBlog: downvoteBlog,
    blogsPerPage: blogsPerPage,
    currentPageOffset: currentPageOffset,
    getSuggestions: getSuggestions,
    filterSuggestions: filterSuggestions,
    getPrevBlogUrl: getPrevBlogUrl,
    getNextBlogUrl: getNextBlogUrl,
    getBlogUrl: getBlogUrl,
    createBlog: createBlog,
    getBlogsAuthored: getBlogsAuthored,
    signupUser: signupUser,
    createComment: createComment
};