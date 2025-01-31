import { PostsService } from "../services/posts.service.js";

export class PostsController {
    postsService = new PostsService();

    createPost = async (req, res, next) => {
        try {
            const { title } = req.body
            const authorId = req.user.id;
            const post = await this.postsService.createPost(title, authorId);
            res.status(201).json(post);
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.log(error)
        }
    }

    getPostById = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const post = await this.postsService.getPostById(id);
            res.status(200).json(post);
        } catch (error) {
            res.status(404).json({ error: error.message });
            console.log(error)
        }
    }

    getAllPosts = async (req, res, next) => {
        try {
            const posts = await this.postsService.getAllPosts();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
            console.log(error)
        }
    }

    updatePost = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const data = req.body;
            const updatedPost = await this.postsService.updatePost(id, data);
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.log(error)
        }
    }

    deletePost = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            await this.postsService.deletePost(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
            console.log(error)
        }
    }
}