import config from "../config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

class Service {
    client;
    databases;
    storage;

    constructor() {
        this.client = new Client()
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ slug, userId, title, content, featuredImage, status }) {
        try {
            return await this.databases.createDocument(config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status, userId
                });
        } catch (error) {
            console.log(`Error while creating new post:${error}`);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status });
        } catch (error) {
            console.log(`Error while updating post:${error}`);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug);
            return true;
        } catch (error) {
            console.log(`Error while deleting post:${error}`);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug);
        } catch (error) {
            console.log(`Error while retrieving a post:${error}`);
        }
    }

    async getAllPosts() {
        try {
            return await this.databases.listDocuments(config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [Query.equal("status", "active")]);
        } catch (error) {
            console.log(`Error while retrieving all active posts:${error}`);
        }
    }

    async createFile(file) {
        try {
            return await this.storage.createFile(config.appwriteBucketId,
                ID.unique(),
                file);
        } catch (error) {
            console.log(`Error while creating a new file:${error}`);
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(config.appwriteBucketId,
                fileId);
        } catch (error) {
            console.log(`Error while deleting a file:${error}`);
        }
    }

    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(config.appwriteBucketId,
                fileId);
        } catch (error) {
            console.log(`Error while getting  file preview:${error}`);
        }
    }
}

const appwriteService = new Service()
export default appwriteService