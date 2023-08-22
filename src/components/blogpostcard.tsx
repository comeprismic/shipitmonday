import React from "react";

const BlogpostCard = () => {
    return (
        <div className="blogpostCard">
            <img
                alt=""
                className="blogImage"
                src="https://via.placeholder.com/598x412"
            />
            <div className="blogpostCard">
                <p className="title">
                    DRAG AND DROP iS THERE !
                </p>
                <p className="description">
                    Contrary to popular belief, Lorem Ipsum is not
                    simply random text. It has roots.
                </p>
                <p className="author">
                    <strong className="authorEmphasis0">
                        By{" "}
                    </strong>
                    &#64;GuyProops
                </p>
            </div>

            <style jsx>{`

        .blogpostCard {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .blogImage {
          width: 400px;
          height: 300px;
          margin-bottom: 24px;
          border: 4px solid rgba(0, 0, 0, 1);
          border-radius: 4px;
        }
        .title {
          max-width: 400px;
          font-family: "Rational Display";
          font-size: 32px;
          font-weight: 700;
          line-height: normal;
          color: rgba(0, 0, 0, 1);
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .description {
          max-width: 400px;
          font-family: "Satoshi";
          font-size: 16px;
          font-weight: 700;
          line-height: 58px;
          color: rgba(0, 0, 0, 1);
          margin-bottom: 16px;
        }
        .author {
          text-align: center;
          font-family: "Satoshi";
          font-size: 16px;
          font-weight: 700;
          line-height: normal;
          color: rgba(77, 150, 132, 1);
        }
        .authorEmphasis0 {
          font-family: "Satoshi";
          font-size: 16px;
          font-weight: 700;
          line-height: normal;
          color: rgba(0, 0, 0, 1);
        }

      `}</style>
        </div>
    );
};

export default BlogpostCard;