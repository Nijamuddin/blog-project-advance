//var URLBase = "http://web-lb-1363649479.us-west-2.elb.amazonaws.com/cmad-blog-project-advance/";
var URLBase = "http://192.168.99.100:8080/cmad-blog-project-advance/";
var blogsPerPage = 4
var currentPageOffset = 0

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

function getComments(blogId, callback) {
    var url = URLBase + "public/blogs/" + blogId + "/comments/";

    $.getJSON(url, function(comments) {
        callback(comments);
    })
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
                    // callback(jqXHR.getResponseHeader("Authorization"));
                    callback("Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImlzcyI6Imh0dHA6Ly8xOTIuMTY4Ljk5LjEwMDo4MDgwL2NtYWQtYmxvZy1wcm9qZWN0LWFkdmFuY2UvcHVibGljL3VzZXJzL2F1dGhlbnRpY2F0ZVVzZXIiLCJpYXQiOjE1MDM3NDkwNjAsImV4cCI6MTUwMzc1MDI2MH0.KckuIb7NFOW-DwUCKCVB2P4VfzOccEJa4nIrjw3R9eISHoHjOG2wo_Np2a9EYvC_uupU-JYBVoLsuccRX2Qn0Q");
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

module.exports = {
    getBlogs: getBlogs,
    getBlog: getBlog,
    getComments: getComments,
    authenticateUser: authenticateUser,
    upvoteBlog: upvoteBlog,
    downvoteBlog: downvoteBlog,
    blogsPerPage: blogsPerPage,
    currentPageOffset: currentPageOffset,
    getSuggestions: getSuggestions
};