import React from "react"
import Link from "gatsby-link"
import * as PropTypes from "prop-types"

import { rhythm } from "../utils/typography"

const propTypes = {
  data: PropTypes.object.isRequired,
}

class PostTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulPost
    const categories = this.props.data.allContentfulPostCategory
    const {
      title,
      content,
      featuredImage,
      category,
    } = post
    return (
      <div>
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
          }}
        >
          {/* <img
            style={{
              height: featuredImage[0].responsiveResolution.height,
              width: featuredImage[0].responsiveResolution.width,
            }}
            src={featuredImage[0].responsiveResolution.src}
            srcSet={featuredImage[0].responsiveResolution.srcSet}
          /> */}
          <h4>
            {title}
          </h4>
        </div>
        <h1>
          {title}
        </h1>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: content.childMarkdownRemark.html,
            }}
          />
          <div>
            <span>See other: </span>
            <ul>
              {category.map((category, i) =>
                <li key={i}>
                  <Link key={i} to={`/post/category/${category.id}`}>
                    {category.title}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

PostTemplate.propTypes = propTypes

export default PostTemplate

export const pageQuery = graphql`
  query postQuery($id: String!) {
    contentfulPost(id: { eq: $id }) {
      title
      content {
        childMarkdownRemark {
          html
        }
      }
      featuredImage {
        responsiveResolution(width: 50, height: 50) {
          src
          srcSet
          height
          width
        }
      }
      category {
        id
        title
      }
    }
    allContentfulPostCategory {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`
