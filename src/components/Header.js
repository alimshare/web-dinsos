import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"

import Typography from "@material-ui/core/Typography"
import Img from "gatsby-image"
import MediaQuery from "react-responsive"

import AppBar from "./AppBar"
import Container from "../layouts/Container"
import Item from "../layouts/Item"

const StyledHeader = styled.header`
  & * {
    color: black;
    font-weight: bold;
  }
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  background-color: #5e92f3;
  /* background-color: #1565c0; */
`

const Header = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }

        headerLogo: file(relativePath: { eq: "images/dinsos-logo.png" }) {
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `
  )

  return (
    <StyledHeader id="header">
      <MediaQuery minDeviceWidth={320} maxDeviceWidth={767}>
        <AppBar />
      </MediaQuery>

      <MediaQuery minDeviceWidth={768}>
        <Container
          style={{ padding: "8px 64px" }}
          alignItems="center"
          justify="space-between"
        >
          <Item>
            <Link to="/">
              <Container alignItems="center" spacing={5}>
                <Item>
                  <Img fixed={data.headerLogo.childImageSharp.fixed} />
                </Item>
              </Container>
            </Link>
          </Item>
          <Item>
            <Container spacing={16}>
              <Item>
                <Link to="/">
                  <Typography variant="button">Beranda</Typography>
                </Link>
              </Item>
              <Item>
                <Link to="/profil">
                  <Typography variant="button">Profil</Typography>
                </Link>
              </Item>
              <Item>
                <Link to="/berita">
                  <Typography variant="button">Berita</Typography>
                </Link>
              </Item>
              <Item>
                <Link to="/infografis">
                  <Typography variant="button">Infografis</Typography>
                </Link>
              </Item>
              <Item>
                <Link to="/kontak">
                  <Typography variant="button">Kontak</Typography>
                </Link>
              </Item>
              <Item>
                <a href="http://siaplus.pusdatin-dinsos.jakarta.go.id/dashboard/login">
                  <Typography variant="button">Login</Typography>
                </a>
              </Item>
            </Container>
          </Item>
        </Container>
      </MediaQuery>
    </StyledHeader>
  )
}

export default Header
