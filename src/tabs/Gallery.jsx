import { Component } from 'react';
import { getImages } from 'service/image-service';

// import * as ImageService from 'service/image-service';
import {
  Button,
  SearchForm,
  Grid,
  GridItem,
  Text,
  CardItem,
  Loader,
} from 'components';

import { animateScroll } from 'react-scroll';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    showBtn: false,
    isLoading: false,
    isEmpty: false,
    error: '',
  };
  componentDidUpdate(props, prevState) {
    console.log('start DidUpdate');
    console.log(this);
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      getImages(this.state.query, this.state.page)
        .then(data => {
          if (!data.photos.length) {
            this.setState({ isEmpty: true });
            return;
          }
          console.log(data);
          this.setState(prevState => ({
            images: [...prevState.images, ...data.photos],
            showBtn: this.state.page < Math.ceil(data.total_results / 15),
          }));
        })
        .catch(err => {
          console.log(err);
          this.setState({ error: err.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }
  onSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      isEmpty: false,
      error: '',
      showBtn: false,
    });
  };

  loadMore = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    this.scrollOnMoreButton();
  };

  scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <Grid>
          {this.state.images.map(image => {
            return (
              <GridItem key={image.id}>
                <CardItem color={image.avg_color}>
                  <img src={image.src.large} alt={image.alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {this.state.showBtn && (
          <Button type="button" onClick={this.loadMore}>
            Load more
          </Button>
        )}
        {this.state.isLoading && <Loader />}
        {this.state.error && <Text textAlign="center">{this.state.error}</Text>}
        {this.state.isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
      </>
    );
  }
}
