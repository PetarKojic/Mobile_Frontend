import React, { useContext, useEffect, useState } from "react";
import {
  BackCatTop,
  CategoryRe,
  LeftLabel,
  NameReTop,
  Rating,
  TopProvidersPos,
  TopProvidersPosInn,
  UserImageTop,
} from "../HomeStyles";
import useMediaQuery from "../../../hooks/MediaQuery";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import "./TopProviders.css";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { TopProvider } from "../../../api";
import { notifyError } from "../../../components/Toastifycom";
import FilterModal from "../../../components/FilterModal";
import { Context } from "../../../Context/ContextStates";
import UserImg from '../../../Assets/Images/profile.png'

const TopProviders = () => {
  const { searchTop } = useContext(Context);

  const [open, setOpen] = React.useState(false);
  const [filterRating, setFilterRating] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(min-width: 950px)");
  const [startIndex, setStartIndex] = useState(0);
  const [rec, setRec] = useState([]);
  const itemsPerPage = isMobile ? 3 : 2;
  const ShowItem = 1;
  const endIndex = startIndex + itemsPerPage;
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    TopProvider()
      .then((e) => {
        if (e.status === false) {
          notifyError("Something went wrong.");
          setLoad(false);
        } else {
          const filteredData = filterRating
            ? e.data.filter((provider) => {
                const rating = parseInt(provider.review.JobDoerRating);
                return (
                  (filterRating === 'Average' && rating < 3) ||
                  (filterRating === 'Good' && rating >= 3 && rating < 4) ||
                  (filterRating === 'Best' && rating >= 4)
                );
              })
            : e.data;
          setRec(filteredData);
          setLoad(false);
        }
      })
      .catch((err) => {
        notifyError("Network Error Detected.");
      });
  }, [filterRating]);

  const isLeftDisabled = startIndex === 0;
  const isRightDisabled = endIndex >= rec.length;

  const handleNextClick = () => {
    if (endIndex < rec.length) {
      setStartIndex(startIndex + ShowItem);
    }
  };

  const handlePreviousClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - ShowItem);
    }
  };

  return (
    <div>
      <div style={{ width: "95%", margin: "auto", padding: "10px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <LeftLabel>Top Dienstleister</LeftLabel>
          <FilterAltOutlinedIcon
            style={{
              color: "ActiveBorder",
              cursor: "pointer",
              fontSize: "30px",
            }}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
       
      <TopProvidersPos>
        <ArrowCircleUpIcon
          style={{
            margin: "auto",
            fontSize: "45px",
            color: "#AA222B",
            cursor: isLeftDisabled ? "no-drop" : "pointer",
          }}
          onClick={handlePreviousClick}
          disabled={isLeftDisabled}
        />
        <TopProvidersPosInn>
          {rec.map((data) => (
            <div key={data.id} style={{backgroundColor:"lightgray",padding:10,marginBottom:10,borderRadius:10,display:"flex", flexDirection:"column"}}>
              <div style={{display:"flex",flexDirection:"row"}}>
                <img src={UserImg} style={{height:80,width:80,marginRight:20}} alt="UserImage"/>
                <div>
                  <p style={{fontSize:18,fontWeight:"600",color:"black"}}>{data.jobHolder.first_name} {data.jobHolder.last_name}</p>
                  <div style={{display:"flex",flexDirection:"row"}}>
                    <StarIcon style={{ color: "#F1B538" }} />
                    <p style={{fontSize:20,fontWeight:"700",marginTop:-5,color:"green",marginLeft:10}}>{data.review.JobDoerRating}</p>
                  </div>
                </div>
              </div>
              <div>
                <p>{data.review.JobOwnerComment}</p>
              </div>
            </div>
          ))}
        </TopProvidersPosInn>
        <ArrowCircleDownIcon
          style={{
            margin: "auto",
            fontSize: "45px",
            color: "#AA222B",
            cursor: isRightDisabled ? "no-drop" : "pointer",
          }}
          onClick={handleNextClick}
          disabled={isRightDisabled}
        />
      </TopProvidersPos> 
      <FilterModal
        open={open}
        onClose={() => setOpen(false)}
        onFilterChange={setFilterRating}
      />
    </div>
  );
};

export default TopProviders;
