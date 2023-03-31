import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/Text-Input';

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [postsPerPage] = useState(9);
    const [searchValue, setSearchValue] = useState('')

    const handleLoadPosts = useCallback(async(page, postsPerPage) => {
        const postsAndPhotos = await loadPosts();

       setPosts(postsAndPhotos.slice(page, postsPerPage));
       setAllPosts(postsAndPhotos);
    }, []);

    useEffect(() => {
        console.log(new Date().toLocaleString('pt-BR'));
        handleLoadPosts(0, postsPerPage);
    }, [handleLoadPosts, postsPerPage]);

    const loadMorePosts = () => {
        const nextPage = page + postsPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
        posts.push(...nextPosts);

        setPosts(posts);
        setPage(nextPage)
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchValue(value);
    }

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
        allPosts.filter(post => {
            return post.title.toLowerCase().includes(
                searchValue.toLowerCase()
            );
        })
        : posts

    return (
        <section className='container'>
            <div className='search-container'>
                {!!searchValue && (
                    <h1>Search Value: {searchValue}</h1>
                )}
                <TextInput searchValue={searchValue} handleChange={handleChange} />
            </div>
            {filteredPosts.length > 0 && (
                <Posts posts={filteredPosts} />
            )}

            <div className='button-container'>
                {!searchValue && (
                    <Button
                        text="Load more posts"
                        onClick={loadMorePosts}
                        disabled={noMorePosts}
                    />
                )}
            </div>
        </section>
    )
}

// export class Home extends Component {
//     state = {
//         posts: [],
//         allPosts: [],
//         page: 0,
//         postsPerPage: 9,
//         searchValue: ''
//     };

//     componentDidMount() {
//         this.loadPosts()
//     }

//     loadPosts = async () => {
//         const { page, postsPerPage } = this.state;

//         const postsAndPhotos = await loadPosts();
//         this.setState({
//             posts: postsAndPhotos.slice(page, postsPerPage),
//             allPosts: postsAndPhotos
//         });
//     }

//     loadMorePosts = () => {
//         const {
//             page,
//             postsPerPage,
//             allPosts,
//             posts,
//         } = this.state;

//         const nextPage = page + postsPerPage;
//         const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//         posts.push(...nextPosts);

//         this.setState({ posts, page:nextPage })
//     }

//     handleChange = (e) => {
//         const { value } = e.target;
//         this.setState({ searchValue: value })
//     }

//     render() {
//         const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

//         const noMorePosts = page + postsPerPage >= allPosts.length;

//         const filteredPosts = !!searchValue ?
//         allPosts.filter(post => {
//             return post.title.toLowerCase().includes(
//                 searchValue.toLowerCase()
//             );
//         })
//         : posts

//         return (
//             <section className="container">
//                 <div className="search-container">
//                     {!!searchValue && (
//                         <h1>Search Value = {searchValue}</h1>
//                     )}

//                     <TextInput
//                         searchValue={ searchValue }
//                         handleChange={ this.handleChange }
//                     />
//                 </div>

//                 {filteredPosts.length > 0 && (
//                     <Posts posts={ filteredPosts }/>
//                 )}

//                 {filteredPosts.length === 0 && (
//                     <h1>There is no posts with title "{searchValue}"</h1>
//                 )}

//                 <div className="button-container">
//                     {! searchValue && (
//                         <Button
//                         onClick={this.loadMorePosts}
//                         text='Load more posts'
//                         disabled={noMorePosts}
//                     />
//                     )}
//                 </div>

//             </section>
//         );
//     };
// }
