package com.cisco.cmad.blogs.data;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.cisco.cmad.blogs.api.Blog;
import com.cisco.cmad.blogs.api.Comment;
import com.mongodb.MongoClient;

public class CommentsDAOImpl extends BasicDAO<Comment, Long> implements CommentsDAO {

	//public static MongoClient mongoClient = new MongoClient("172.31.39.116:27017");
	public static MongoClient mongoClient = new MongoClient("192.168.99.1:27017");
	public static Morphia morphia = new Morphia();
	public static Datastore datastore = morphia.createDatastore(mongoClient, "cmad_blog");
	private static final AtomicInteger index = new AtomicInteger(0);

    public CommentsDAOImpl() {
        this(Comment.class, datastore);
        Comment comment = findOne(createQuery().order("-commentId"));
        if (comment != null) {
            index.set((int)comment.getCommentId());
        }
    }

	public CommentsDAOImpl(Class<Comment> entityClass, Datastore ds) {
		super(entityClass, ds);
	}

	@Override
	public void create(Comment comment) {
		try {
			comment.setCommentId(index.incrementAndGet());
	        save(comment);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public Comment read(long commentId) {
        Comment comment = findOne("_id", commentId);
        return comment;
	}

	@Override
	public List<Comment> readAllByBlogId(long blogId) {
        List<Comment> comments = createQuery().filter("blogId", blogId).order("-lastUpdatedOn").asList();
        return comments;
	}

	@Override
	public void update(Comment updatedComment) {
        Comment temp = read(updatedComment.getCommentId());
		temp.setCommentText(updatedComment.getCommentText());
		temp.setUpVote(updatedComment.getUpVote());
		temp.setDownVote(updatedComment.getDownVote());
        save(temp);
	}

	@Override
	public void delete(long commentId) {
        Comment comment = read(commentId);
        delete(comment);
	}

	@Override
	public long readCountByBlogId(long blogId) {
		List<Comment> comments = createQuery().filter("blogId", blogId).asList();
		return comments.size();
	}
}
