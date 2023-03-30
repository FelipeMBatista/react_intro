import { Component } from 'react';
import './styles.css';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/Textinput';

export class Home extends Component {
    state = {
        posts: [],
        allPosts: [],
        page: 0,
        postsPerPage: 3
    };

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts = async () => {
        const { page, postsPerPage } = this.state;

        const postsAndPhotos = await loadPosts();
        this.setState({
            posts: postsAndPhotos.slice(page, postsPerPage),
            allPosts: postsAndPhotos
        });
    }

    loadMorePosts = () => {
        const {
            page,
            postsPerPage,
            allPosts,
            posts,
            searchValue = '',
        } = this.state;

        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
        posts.push(...nextPosts);

        this.setState({ posts, page:nextPage })
    }

    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ searchValue: value })
    }



    render() {
        const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

        const noMorePosts = page + postsPerPage >= allPosts.length;

        const filteredPosts = !!searchValue ?
        allPosts.filter(post => {
            return post.title.toLowerCase().includes(
                searchValue.toLowerCase()
            );
        })
        : posts

        return (
            <section className="container">
                <div className="search-container">
                    {!!searchValue && (
                        <h1>Search Value = {searchValue}</h1>
                    )}

                    <TextInput
                        searchValue={ searchValue }
                        handleChange={ this.handleChange }
                    />
                </div>

                {filteredPosts.length > 0 && (
                    <Posts posts={ filteredPosts }/>
                )}

                {filteredPosts.length === 0 && (
                    <h1>There is no posts with title "{searchValue}"</h1>
                )}

                <div className="button-container">
                    {! searchValue && (
                        <Button
                        onClick={this.loadMorePosts}
                        text='Load more posts'
                        disabled={noMorePosts}
                    />
                    )}
                </div>

            </section>
        );
    }
}