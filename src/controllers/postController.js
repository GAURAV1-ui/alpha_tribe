import {Post} from "../models/postModel.js";
import {Comment} from "../models/commentModel.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
    try {
        const {stockSymbol, title, description, tags} = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const newPost = new Post({
            userId: req.user._id,
            stockSymbol,
            title,
            description,
            tags
        });
        const savedPost = await newPost.save();

        if (!savedPost) {
            return res.status(500).json({ message: "Post not saved" });
        }

        return res.status(201).json({ success: true, postId:savedPost._id, message: 'Post created successfully'});

        
} catch (error) {
    res.status(500).json({ error: error.message });
    }
}

export const getPosts = async (req, res) => {
    const { stockSymbol, tags, sortBy, page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;

    const match = {};
    if (stockSymbol) {
        match.stockSymbol = stockSymbol;
    }
    if (tags) {
        match.tags = { $in: tags.split(",") };
    }

    const sortOptions = {};
    if (sortBy === "like") {
        sortOptions.likeCount = -1;
    }
    else {
        sortOptions.createdAt = -1;
    }

    try {
        const posts = await Post.aggregate([
            {
                $match: match
            },
            {
                $addFields: {
                    likeCount: { $size: "$likes" }
                }
            },
            {
                $sort: sortOptions
            },
            {
                $facet: {
                    data: [{ $count: "total" }, { $addFields: { page: pageNumber, limit: pageSize } }],
                    posts: [
                        { $skip: (pageNumber - 1) * pageSize },
                        { $limit: pageSize }
                    ]
                }
            },
            {
                $project: {
                    total: { $arrayElemAt: ['$data.total', 0] },
                    posts: '$posts'
                }
            }
        ]);

        const { total = 0, posts: paginatedPosts = [] } = posts[0] || {};

        const formattedPosts = paginatedPosts.map((post) => ({
            postId: post._id,
            stockSymbol: post.stockSymbol,
            title: post.title,
            description: post.description,
            likesCount: post.likeCount,
            createdAt: post.createdAt
        }));

        return res.status(200).json({
            totalPosts: total,
            currentPage: pageNumber,
            totalPages: Math.ceil(total / pageSize),
            pageSize,
            posts: formattedPosts
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
}


export const getPost = async(req, res) => {
    const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comments = await Comment.find({ postId: post._id })

    const formattedComments = comments.map((comment) => ({
      commentId: comment._id,
      userId: comment.userId._id,
      comment: comment.content,
      createdAt: comment.createdAt,
    }));

    const formattedPost = {
      postId: post._id,
      stockSymbol: post.stockSymbol,
      title: post.title,
      description: post.description,
      likesCount: post.likes.length,
      comments: formattedComments,
    };

    res.status(200).json(formattedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}









