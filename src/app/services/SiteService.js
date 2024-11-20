const articleRepository = require('../repository/ArticleRepository');
const userArticleRepository = require('../repository/UserArticleRepository');

class SiteService {

    index = async (req, res) => {
        const articles = await articleRepository.getAllArticles();

        res.status(200).json({
            status: true,
            data: articles,
            msg: 'Load articles successfully !'
        })
    }

    addArticle = async (req, res) => {
        const {title, content, author_name} = req.body;
        const error = req.flash('error');
        try {
            if(error.length === 0){
                const articleData = {
                    title, content, author_name
                }
                const article = await articleRepository.insertArticle(articleData);
                if(article.length === 0) throw new Error('Add articles failed !');
                return res.status(201).json({
                    status: true,
                    data: article,
                    msg: 'Add articles successfully !'
                })
            } else{
                throw new Error(error[0]);
            }
        }
        catch (e) {
            return res.status(400).json({
                status: true,
                msg: e.message
            })
        }

    }

    editArticle = async (req, res) => {
        const {id} = req.params;
        const {title, content, author_name} = req.body;
        const error = req.flash('error');
        const userSession = req.session.user;
        try {
            if(error.length === 0) {
                const articleData = {
                    _id: id,
                    title, content, author_name,
                    updatedAt: Date.now(),
                }
                const previousArticle = await articleRepository.getArticleById(id);
                if(!previousArticle) throw new Error('Article is not exits !');

                const value = await articleRepository.editArticle(articleData);

                if(!value.acknowledged) throw new Error('Update Article Failed !!');

                const previousArticleData = {
                    article_id: id,
                    title: previousArticle.title,
                    content: previousArticle.content,
                    author_name: previousArticle.author_name,
                    updatedAt: Date.now()
                }
                const userArticleData = {
                    article_id: id,
                    previous_title: previousArticle.title,
                    previous_content: previousArticle.content,
                    previous_author_name: previousArticle.author_name,
                    updatedAt: Date.now(),
                    user_id: userSession.user._id,
                    process: 'UPDATE'
                }
                const userArticleUpdate = await userArticleRepository.insertUserArticle(userArticleData);
                if (userArticleUpdate.length === 0) {
                    await articleRepository.editArticle(previousArticleData);
                    throw new Error('Update article failed !');
                }

                return res.status(200).json({
                    status: true,
                    data: articleData,
                    msg: 'Update article successfully !'
                })
            } else{
                throw new Error(error[0]);
            }
        } catch (e) {
            return res.status(400).json({
                status: false,
                msg: e.message,
            })
        }
    }

    deleteArticle = async (req, res) => {
        const {id} = req.params;
        const userSession = req.session.user;

        try {
            const previousArticle = await articleRepository.getArticleById(id);
            if(!previousArticle) throw new Error('Article is not exits !');

            const deleted = await articleRepository.deleteArticle(id);
            if(!deleted.acknowledged) throw new Error('Delete Article Failed !');

            const userArticleData = {
                article_id: id,
                previous_title: previousArticle.title,
                previous_content: previousArticle.content,
                previous_author_name: previousArticle.author_name,
                updatedAt: Date.now(),
                user_id: userSession.user._id,
                process: 'DELETE'
            }
            const userArticleUpdate = await userArticleRepository.insertUserArticle(userArticleData);
            if (userArticleUpdate.length === 0) {
                await articleRepository.deleteArticle(id, false);
                throw new Error('Delete article failed !');
            }

            return res.status(200).json({
                status: true,
                msg: 'Delete Article successfully !'
            })
        } catch (e) {
            return res.status(400).json({
                status: false,
                msg: e.message
            })
        }
    }

}
module.exports = new SiteService;