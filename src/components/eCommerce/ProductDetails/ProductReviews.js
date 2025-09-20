import React from "react";
import Grid from "@mui/material/Grid";
import Image from "next/image";

const ProductReviews = () => {
  return (
    <>
      <Grid
        container
        rowSpacing={2}
        alignItems="center"
        columnSpacing={{ xs: 1, sm: 1, md: 1, lg: 3, xl: 4 }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
          <div className="review-card">
            <div className="content">
              <div className="reating">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
              </div>

              <p>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit.
              </p>

              <Image
                src="/images/down-arrow.png"
                alt="down-arrow"
                className="down-arrow"
                width={46}
                height={28}
              />
            </div>
            <div className="info">
              <Image
                src="/images/user1.png"
                alt="User"
                width={45}
                height={45}
              />
              <h4>Alvarado Turner</h4>
            </div>
          </div>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
          <div className="review-card">
            <div className="content">
              <div className="reating">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
              </div>

              <p>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit.
              </p>

              <Image
                src="/images/down-arrow.png"
                alt="down-arrow"
                className="down-arrow"
                width={46}
                height={28}
              />
            </div>
            <div className="info">
              <Image
                src="/images/user2.png"
                alt="User"
                width={45}
                height={45}
              />
              <h4>Riley Dave</h4>
            </div>
          </div>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4, xl: 4 }}>
          <div className="review-card">
            <div className="content">
              <div className="reating">
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
              </div>

              <p>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit.
              </p>

              <Image
                src="/images/down-arrow.png"
                alt="down-arrow"
                className="down-arrow"
                width={46}
                height={28}
              />
            </div>
            <div className="info">
              <Image
                src="/images/user3.png"
                alt="User"
                width={45}
                height={45}
              />
              <h4>Ivan Dan</h4>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductReviews;
