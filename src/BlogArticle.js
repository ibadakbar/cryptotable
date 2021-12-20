import React, { useEffect, useState } from 'react'
import '../src/App.css';
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import banner from '../src/banner.jpg'





const BlogsPage = () => {

    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);

    //limits
    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxpageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minpageNumberLimit, setminPageNumberLimit] = useState(-1);
    const [blogs, setBlogs] = useState([]);
   
    const [loading, setLoading] = useState(true)

    const url = `https://api.coinstats.app/public/v1/news?skip=0&limit=${pageNumber}&toDate=1555508420000&fromDate=15555084200`;

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    useEffect(() => {
        axios.get(url).then((res) => {
            setBlogs(res.data.news)
            setLoading(false)
        })
            .catch(err => err)

    }, [url])





    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
        if ((pageNumber - 1) % pageNumberLimit == 2) {
            setmaxPageNumberLimit(maxpageNumberLimit - pageNumberLimit)
            setminPageNumberLimit(minpageNumberLimit - pageNumberLimit)
        }
    };

    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));

        if (pageNumber + 1 > maxpageNumberLimit) {
            setmaxPageNumberLimit(maxpageNumberLimit + pageNumberLimit)
            setminPageNumberLimit(minpageNumberLimit + pageNumberLimit)
        }

    };

    let pageIncrementBtn = null;
    if (pages.length > maxpageNumberLimit) {
        pageIncrementBtn = <li onClick={gotoNext}>&hellip;</li>
    }
    let pageDecrementBtn = null;
    if (pages.length > maxpageNumberLimit) {
        pageDecrementBtn = <li onClick={gotoPrevious}>&hellip;</li>
    }


    const [searchItem, SetSearchItem] = useState('')

    if (loading) return <div className="loadings">  </div>

    return (

        <div>


            <div className="Blogs-main">




                {
                    blogs == "" || blogs == "undefined" || blogs == null ?
                        <div className="Left-col">
                            <h1 className="Not-Heads"> No Blogs Yet  </h1>
                        </div>
                        :
                        <div className="Left-col">

                            {
                                blogs.map(blog => {
                                    console.log(blog)
                                    return (
                                        <div className='Left-Col-Container' key={blog?.id} >

                                            <div>


                                                <div class="Blog-title-Div">

                                                    <h1 className='blog_top_heading'>{blog?.title}</h1>

                                                </div>

                                                <div>

                                                    <span className='user_name'><AccountCircleIcon className='user-avatar' /> <sup className='Auth-name'>{blog.source} <span className='POST-DATE'> {`FEED DATE: ${blog.feedDate}`}</span> </sup> </span>

                                                </div>

                                            </div>


                                            <div className="blogs-card">
                                               <a href = {blog.link} target= 'blank'> <img effect="blur" src={blog?.imgURL} className="blog-img" alt="blogs" height='450px' width='100%' /> </a>

                                            </div>
                                            <hr></hr>




                                        </div>




                                    )


                                })

                            }

                            <div className="pagination-main">
                                <button className="btn btn-danger" onClick={gotoPrevious}>Previous</button>
                                <li className="btn "> {pageDecrementBtn}</li>
                                {pages.map((pageIndex) => (
                                    (pageIndex < maxpageNumberLimit + 1 && pageIndex > minpageNumberLimit) ?
                                        <li className={pageNumber === pageIndex ? "pagination_btns page-active" : "pagination_btns"} key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                                            {pageIndex + 1}
                                        </li>
                                        : null
                                ))}
                                <li className="btn"> {pageIncrementBtn}</li>
                                <button className="btn btn-danger" onClick={gotoNext}>Next</button>
                            </div>




                        </div>
                }
                <div className="Right-Col">

                    <div className="img-disc">
                        <img className="text-center" src={banner} effect="blur" width="300px" height="900px" alt="banner" />
                    </div>


                </div>



            </div>

          

        </div>

    )

}

export default BlogsPage