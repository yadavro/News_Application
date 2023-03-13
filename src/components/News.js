import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country:'in',
    pageSize:9,
   category:"general"
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
     category:PropTypes.string,
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
    constructor(props){
        super(props);
        this.state={
          data :[],
          loading :true,
          page:1,
          totalResults:0
        }
        document.title=`Daily Alert-${this.capitalizeFirstLetter(this.props.category)}`
      }
      async updateNews(){
       await this.props.setProgress(0);
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        fetch(url).then((res)=>{
           this.props.setProgress(20);
          this.setState({loading:true})
            res.json().then((result)=>{
            this.props.setProgress(60);
                console.log(result.articles)
                this.setState({data:result.articles,totalResults:result.totalResults,loading:false})
            })
        })
        this.props.setProgress(100);
      }
    
    // let {pageSize}=this.props;
      componentDidMount(){
        // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b49b3a936d1e42a6bcc51cbd5b979ff9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // fetch(url).then((res)=>{
        //   this.setState({loading:true})
        //     res.json().then((result)=>{
        //         console.log(result.articles)
        //         this.setState({data:result.articles,totalResults:result.totalResults,loading:false})
        //     })
        // })
        this.updateNews();
    }
    handleNext=async()=>{
        console.log("next");
  //       if(this.state.page+1<=Math.ceil(this.state.totalResults/this.props.pageSize)){
  // this.setState({loading:true})
  //       let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b49b3a936d1e42a6bcc51cbd5b979ff9&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //       fetch(url).then((res)=>{
  //           res.json().then((result)=>{
  //               console.log(result.articles)
  //               this.setState({data:result.articles,loading:false})
  //           })
  //       })
    // }
    await this.setState({
        page:this.state.page+1,
        // loading:false
      })
      this.updateNews();
    
    }

    handlePrev =async()=>{
        console.log("prev");
        // this.setState({loading:true})
        // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b49b3a936d1e42a6bcc51cbd5b979ff9&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        
        // fetch(url).then((res)=>{
        //     res.json().then((result)=>{
        //         console.log(result.articles)
        //         this.setState({data:result.articles,
        //           // page:this.state.page-1,
        //           loading:false
        //         })
        //     })
        // })
     await this.setState({
          page:this.state.page-1,
          // loading:false
        })
       this.updateNews();
    }

    fetchMoreData = async() => {
      console.log(this.state.page);
      this.setState({
        page:this.state.page+1,
      })
      console.log(this.state.page);
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        fetch(url).then((res)=>{
            res.json().then((result)=>{
                console.log(result.articles)
                this.setState({data:this.state.data.concat(result.articles),totalResults:result.totalResults,})
            })
        })
    };
    
      render() {
        return (
          <>
          
          
          <h2 className='text-center' style={{color:'blue' , marginTop:"90px"}}>Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
         {this.state.loading?<Spinner/>:''}
         <InfiniteScroll
          dataLength={this.state.data.length}
          next={this.fetchMoreData}
          hasMore={this.state.data.length!==this.state.totalResults}
          loader={<Spinner/>}
          endMessage={
          <p style={{ textAlign: 'center' }}>
             <b>Yay! You have seen it all</b>
          </p>
  }
        >
        <div className="container">

          <div className='row my-5' >
            {
            this.state.data.map((element)=>
               <div className="col-md-4" key={element.url} >
            <Newsitem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageurl={element.urlToImage} newsurl={element.url} author={element.author?element.author:"anonyms"} date={element.publishedAt} source={element.source.name?element.source.name:"Broadcaster"}/>
            </div>
            )
            } 
          </div>
          </div>
          </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
            <button  disabled={this.state.page<=1} type="button" className="btn btn-info" onClick={this.handlePrev}>&laquo;Prev</button>
            <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handleNext}>Next &raquo;</button>

            </div> */}
                      
      
          </>
        )
      }
    }
    
    export default News;
// b49b3a936d1e42a6bcc51cbd5b979ff9