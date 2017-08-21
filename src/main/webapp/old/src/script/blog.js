var URLBase = ""; //"http://192.168.99.100:9999/cmad-blog-project/";

function createComment(id) {
    var commentTemplate = '<div class="panel panel-default"> \
                                <div class="panel-body"> \
                                    <span id="comment-{0}-content"></span> \
                                </div> \
                                <div class="panel-footer row"> \
                                    <div class="col-md-6"> \
                                    </div> \
                                    <div class="col-md-2"> \
                                    </div> \
                                    <div class="col-md-2"> \
                                        <a href="#"><span class="glyphicon glyphicon-thumbs-up"></span> <span class="badge" id="comment-{0}-upvotes"></span></a> \
                                    </div> \
                                    <div class="col-md-2"> \
                                        <a href="#"><span class="glyphicon glyphicon-thumbs-down"></span> <span class="badge" id="comment-{0}-downvotes"></span></a> \
                                    </div> \
                                </div> \
                            </div>'

    var comment = commentTemplate.replace(/\{0\}/g, id);
    return comment;
}

function createBlog() {
    var blogTemplate = '<h2><b><span id="blog-read-title"></span></b></h2> \
                        <div class="panel panel-default"> \
                            <div class="panel-body"> \
                                <span id="blog-read-content"></span> \
                            </div> \
                            <div class="panel-footer row"> \
                                <div class="col-md-6"> \
                                    <a href="#">#delete</a> \
                                </div> \
                                <div class="col-md-2"> \
                                    <!--a href="#">Comments <span class="badge" id="blog-read-comments"></span></a--> \
                                </div> \
                                <div class="col-md-2"> \
                                    <a href="#"><span class="glyphicon glyphicon-thumbs-up"></span> <span class="badge" id="blog-read-upvotes"></span></a> \
                                </div> \
                                <div class="col-md-2"> \
                                    <a href="#"><span class="glyphicon glyphicon-thumbs-down"></span> <span class="badge" id="blog-read-downvotes"></span></a> \
                                </div> \
                            </div> \
                        </div>'

    return blogTemplate;
}

function appendBlog(id, focus) {
    var blogTemplate = '<div class="panel panel-default"> \
                    <div class="panel-heading"> \
                        <h4 class="panel-title"> \
                            <a data-toggle="collapse" data-parent="#{1}" href="#collapse{0}"> \
                                <span id="blog-{0}-title"></span> \
                            </a> \
                        </h4> \
                    </div> \
                    <div id="collapse{0}" class="panel-collapse collapse {2}"> \
                        <div class="panel-body" style="overflow: hidden; height:5em"> \
                            <span id="blog-{0}-content"></span> \
                        </div> \
                        <div class="panel-footer row"> \
                            <div class="col-md-6"> \
                                <a href="#">#delete</a> \
                            </div> \
                            <div class="col-md-2"> \
                                <a href="#">Comments <span class="badge" id="blog-{0}-comments"></span></a> \
                            </div> \
                            <div class="col-md-2"> \
                                <a href="#"><span class="glyphicon glyphicon-thumbs-up"></span> <span class="badge" id="blog-{0}-upvotes"></span></a> \
                            </div> \
                            <div class="col-md-2"> \
                                <a href="#"><span class="glyphicon glyphicon-thumbs-down"></span> <span class="badge" id="blog-{0}-downvotes"></span></a> \
                            </div> \
                        </div> \
                    </div> \
                </div>';

    var collapse = (focus === true) ? "in" : "";
    var blog = blogTemplate.replace(/\{0\}/g, id).replace(/\{1\}/g, "bloglist").replace(/\{2\}/g, collapse);
    return blog;
}

function loadHomePage() {
    // send a request to load all the blog entries
    var url = URLBase + "public/blogs";
    var blog = "";

    // allow option to create and sort tabs
    $('#opt-create').show();
    $('#opt-sort').show();

    $('#blog-list').show();
    $('#blog-read').hide();
    $('#blog-create').hide();

    $("#bloglist").html("");

    $.getJSON(url, function(bloglist) {
        $.each(bloglist, function(index, blogEntry) {
            blog = blog.concat(appendBlog(index, (index === 0) ? true : false));
        })

        $("#bloglist").html(blog);

        $.each(bloglist, function(index, blogEntry) {
            $("#blog-" + index + "-title").html(blogEntry.title);
            $("#blog-" + index + "-content").html(blogEntry.blogContent);
            $("#blog-" + index + "-upvotes").html(blogEntry.upVote);
            $("#blog-" + index + "-downvotes").html(blogEntry.downVote);

            $("#blog-" + index + "-upvotes").click(function() {
                $.ajax({
                    url: URLBase + "public/blogs/" + blogEntry.blogId + "/upvote",
                    type: 'PUT',
                    success: function(result) {
                        loadHomePage();
                    }
                });
            })

            $("#blog-" + index + "-downvotes").click(function() {
                $.ajax({
                    url: URLBase + "public/blogs/" + blogEntry.blogId + "/downvote",
                    type: 'PUT',
                    success: function(result) {
                        loadHomePage();
                    }
                });
            })

            $("#collapse" + index).click(function() {
                loadBlog(blogEntry.blogId);
            })

            var countUrl = URLBase + "public/blogs/" + blogEntry.blogId + "/comments/count";
            $.get(countUrl, function(count) {
                $("#blog-" + index + "-comments").html(count);
            })
        })
    })
}

function loadCreate() {
    var url = URLBase + "public/blogs/";

    $('#opt-create').hide();
    $('#opt-sort').hide();

    $('#blog-list').hide();
    $('#blog-read').hide();
    $('#blog-create').show();

    $('#blog-title').val("")
    $('#blog-comment').val("")

    $('#blog-btn-create').click(function() {
        var title = $('#blog-title').val();
        var content = $('#blog-comment').val();
        if ((title !== "") && (content !== "")) {
            var blog = {
                "title": title,
                "blogContent": content,
                "category": "private",
                "upVote": 0,
                "downVote": 0,
                "author": { "userName": "test", "password": "test@123", "firstName": "Tester", "lastName": "", "emailId": "test@test.com" }
            }
            $.ajax({
                url: url,
                type: "POST",
                data: JSON.stringify(blog),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                complete: function(jqXHR, textStatus) {
                    switch (jqXHR.status) {
                        case 201:
                            loadHomePage();
                            break;
                        default:
                            alert("Error in creating the blog!!!");
                    }
                }
            });
        } else {
            loadCreate();
        }
    })

    $('#blog-btn-cancel').click(function() {
        loadCreate();
    })
}

function loadBlog(blogId) {
    // send a request to load the input blog entry
    var url = URLBase + "public/blogs/" + blogId;
    var comments = "";

    // allow option to sort tabs/ hide create option
    $('#opt-create').hide();
    $('#opt-sort').show();

    $('#blog-list').hide();
    $('#blog-read').show();
    $('#blog-create').hide();

    $("#blogread").html("");
    $("#commentlist").html("");

    $.getJSON(url, function(blog) {
        $("#blogread").html("".concat(createBlog()));
        $("#blog-read-title").html(blog.title);
        $("#blog-read-content").html(blog.blogContent);
        $("#blog-read-upvotes").html(blog.upVote);
        $("#blog-read-downvotes").html(blog.downVote);

        var commentUrl = URLBase + "public/blogs/" + blog.blogId + "/comments/";
        $.getJSON(commentUrl, function(commentList) {
            $.each(commentList, function(index, commentEntry) {
                comments = comments.concat(createComment(index))
            })
            $("#commentlist").html(comments);

            $.each(commentList, function(index, commentEntry) {
                $("#comment-" + index + "-content").html(commentEntry.commentText);
                $("#comment-" + index + "-upvotes").html(commentEntry.upVote);
                $("#comment-" + index + "-downvotes").html(commentEntry.downVote);

                $("#comment-" + index + "-upvotes").click(function() {
                    $.ajax({
                        url: URLBase + "public/blogs/" + blogId + "/comments/" + commentEntry.commentId + "/upvote",
                        type: 'PUT',
                        success: function(result) {
                            loadBlog(blogId);
                        }
                    });
                })

                $("#comment-" + index + "-downvotes").click(function() {
                    $.ajax({
                        url: URLBase + "public/blogs/" + blogId + "/comments/" + commentEntry.commentId + "/downvote",
                        type: 'PUT',
                        success: function(result) {
                            loadBlog(blogId);
                        }
                    });
                })
            })
        })
    });
}

$(document).ready(function() {
    $('#home').click(function() {
        loadHomePage();
    });
    $('#opt-create').click(function() {
        loadCreate();
    })
    loadHomePage();
    // //var url = "http://localhost:8081/cmad-blog-project/public/blogs"
    // var blog1 = appendBlog("1", true);
    // var blog2 = appendBlog("2");

    // $("#bloglist").html("".concat(blog1).concat(blog2));

    // $('#opt-create').show();
    // $('#opt-sort').show();

    // //$("#blogread").html("".concat(createBlog()));
    // //$("#commentlist").html("".concat(createComment("1").concat(createComment("2")).concat(createComment("3"))));

    // $("#blog-1-title").html("First Blog...");
    // $("#blog-1-content").html("This is my first blog!!!<br>This<br>is<br>my<br>first<br>blog!!!\n");
    // $("#blog-1-comments").html("0");
    // $("#blog-1-upvotes").html("0");
    // $("#blog-1-downvotes").html("0");

    // // $("#comment-1-content").html("This is blah blah!!!\n");
    // // $("#comment-1-upvotes").html("0");
    // // $("#comment-1-downvotes").html("0");

    // // $("#comment-2-content").html("This is blah blah 2!!!\n");
    // // $("#comment-2-upvotes").html("0");
    // // $("#comment-2-downvotes").html("0");

    // // $("#comment-3-content").html("This is blah blah 3!!!\n");
    // // $("#comment-3-upvotes").html("0");
    // // $("#comment-3-downvotes").html("0");

    // $("#blog-2-title").html("Second Blog...");
    // $("#blog-2-content").html("This is my second blog!!!");
    // $("#blog-2-comments").html("0");
    // $("#blog-2-upvotes").html("0");
    // $("#blog-2-downvotes").html("0");


});