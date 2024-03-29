import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import HomeContent from "./HomeContent";
import { Container } from "./HomeStyles";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router";
import { getData } from "../../api";

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
         const token = localStorage.getItem("@storage_Key");
         if (!token) {
             navigate("/login");
        }
    }, []); 
    
    return(
        <div>
            <Header />
            <HomeContent/>
            <Footer/>
        </div>
    )
}
export default Home;