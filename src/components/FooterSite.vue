<template>
  <footer class="site-footer">
    <div class="container">
      <div class="wrapper">
        <div class="top">
          <div class="col">
            <h1 class="title">About company</h1>
            <p class="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
              voluptatum dolor necessitatibus illum blanditiis deserunt suscipit
              tempore ducimus possimus, nobis labore ab officia, veniam quae
              facilis perferendis obcaecati amet eligendi.
            </p>
          </div>
          <div class="col">
            <h1 class="title">About</h1>
            <ul>
              <li><a href="">About</a></li>
              <li><a href="">Term and Condition</a></li>
              <li><a href="">Privacy Policy</a></li>
              <li><a href="">FAQ</a></li>
              <li><a href="">Contact Us</a></li>
            </ul>
          </div>
          <div class="col">
            <h1 class="title">Session</h1>
            <ul>
              <li><a href="">Sign In</a></li>
              <li><a href="">Register</a></li>
              <li><a href="">Forgot Password</a></li>
              <li><a href="">Thank You</a></li>
            </ul>
          </div>
          <div class="col">
            <h1 class="title">Categories</h1>
            <ul>
              <li><a href="">Men</a></li>
              <li><a href="">Women</a></li>
              <li><a href="">Accessories</a></li>
              <li><a href="">Gadgets</a></li>
            </ul>
          </div>
          <div class="col">
            <h1 class="title">Social</h1>
            <ul>
              <li><a href="">Facebook</a></li>
              <li><a href="">Twitter</a></li>
              <li><a href="">Youtube</a></li>
              <li><a href="">Google Plus</a></li>
            </ul>
          </div>
        </div>
        <div class="bottom">
          <div class="socials">
            <a class="item" href=""><img src="@/assets/img/telegram.svg" /></a>
            <a class="item" href=""><img src="@/assets/img/whatsapp.svg" /></a>
            <a class="item" href=""><img src="@/assets/img/instagram.svg" /></a>
          </div>
          <div class="terms">© All Rights Reversed | Made With by Darkhan</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer.site-footer {
  margin-top: 50px;
  background-color: #000;
  .wrapper {
    .top {
      display: flex;
      padding: 2rem 0;

      .col {
        .title {
          margin-bottom: 1rem;
          color: var(--primary-bg);
        }
        .description {
          color: var(--primary-bg);
        }

        ul {
          list-style-type: none;
          li {
            margin-bottom: 0.5rem;
            a {
              color: var(--primary-bg);
            }
          }
        }

        &:nth-child(1) {
          flex: 1 1 40%;

          .description {
            padding: 0 5rem 0 0;
          }
        }
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4) {
          flex: 1 1 15%;
        }
        &:nth-child(5) {
          flex: 1 1 5%;
        }
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2rem 0;
      border-top: 2px solid var(--primary);

      .socials {
        display: flex;
        align-items: center;

        .item {
          margin-right: 0.5rem;
          img {
            width: 1.5rem;
          }
        }
      }
      .terms {
        color: var(--primary-bg);
      }
    }
  }
}
</style>
