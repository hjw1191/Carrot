import "./Main.css";
import { ModalEditor } from "../components/Modal_Editor";
import { ModalPosting } from "../components/Modal_Posting";  // 새로 추가
import { useState, useEffect } from "react";

export function Main() {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [activeFilter, setActiveFilter] = useState("전체");
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isPostingModalOpen, setIsPostingModalOpen] = useState(false);  // 새로 추가

  useEffect(() => {
    // 초기 데이터 설정
    const initialTrips = [
      {
        type: "탑승자",
        route: "서울 → 부산",
        time: "오후 2:00 출발",
        date: "2024-09-03",
        gender: "성별무관"
      },
      {
        type: "탑승자",
        route: "인천 → 대전",
        time: "오전 9:00 출발",
        date: "2024-09-04",
        gender: "성별무관"
      },
      {
        type: "탑승자",
        route: "대구 → 광주",
        time: "오후 3:00 출발",
        date: "2024-09-03",
        gender: "성별무관"
      },
      {
        type: "탑승자",
        route: "수원 → 천안",
        time: "저녁 7:00 출발",
        date: "2024-09-04",
        gender: "성별무관"
      },
      {
        type: "운전자",
        route: "부산 → 서울",
        time: "오전 6:00 출발",
        date: "2024-09-03",
        gender: "성별무관"
      },
      {
        type: "운전자",
        route: "대전 → 인천",
        time: "오후 1:00 출발",
        date: "2024-09-04",
        gender: "성별무관"
      },
      {
        type: "운전자",
        route: "광 → 대구",
        time: "오후 4:00 발",
        date: "2024-09-03",
        gender: "성별무관"
      },
      {
        type: "운전자",
        route: "천안 → 수원",
        time: "오전 10:00 출발",
        date: "2024-09-04",
        gender: "성별무관"
      },
      {
        type: "택시",
        route: "서울 시내",
        time: "저녁 8:00 출발",
        date: "2024-09-03",
        gender: "성별무관"
      },
      {
        type: "택시",
        route: "인천 국제공항 → 서울",
        time: "오전 7:00 출발",
        date: "2024-09-03",
        gender: "성별무관"
      },
    ];
    setTrips(initialTrips);
    setFilteredTrips(initialTrips);
  }, []);

  const searchTrips = (event) => {
    event.preventDefault();
    const departure = document.getElementById("departure").value.toLowerCase();
    const arrival = document.getElementById("arrival").value.toLowerCase();
    const date = document.getElementById("tripDate").value;

    const filtered = trips.filter((trip) => {
      const [from, to] = trip.route.toLowerCase().split("→");
      const dateMatch = date === "" || trip.date === date;
      const departureMatch =
        departure === "" || from.trim().includes(departure);
      const arrivalMatch =
        arrival === "" ||
        (to ? to.trim().includes(arrival) : from.includes(arrival));

      return dateMatch && departureMatch && arrivalMatch;
    });

    setFilteredTrips(filtered);
  };

  const filterTrips = (filterType) => {
    setActiveFilter(filterType);
    if (filterType === "전체") {
      setFilteredTrips(trips);
    } else {
      const filtered = trips.filter((trip) => trip.type === filterType);
      setFilteredTrips(filtered);
    }
  };

  const handleWriteSubmit = (newTrip) => {
    setTrips([newTrip, ...trips]);
    setFilteredTrips([newTrip, ...filteredTrips]);
  };

  const handleEdit = (editedTrip) => {
    console.log("Edited trip:", editedTrip);  // 로그 추가
    const updatedTrips = trips.map((trip) =>
      trip === selectedTrip ? editedTrip : trip
    );
    setTrips(updatedTrips);
    setFilteredTrips(updatedTrips);
    setIsEditModalOpen(false);
  };

  const handleDelete = (tripToDelete) => {
    const updatedTrips = trips.filter((trip) => trip !== tripToDelete);
    setTrips(updatedTrips);
    setFilteredTrips(updatedTrips);
  };

  const handleEditClick = (trip) => {
    console.log("Selected trip:", trip);  // 로그 추가
    setSelectedTrip(trip);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTrip(null);
  };

  const handlePostSubmit = (newTrip) => {
    setTrips([newTrip, ...trips]);
    setFilteredTrips([newTrip, ...filteredTrips]);
    setIsPostingModalOpen(false);
  };

  return (
    <div id="Main">
      <div className="banner">
        <video autoPlay muted loop>
          <source src="/vid/vid2.mp4" />
        </video>
      </div>
      <div className="content">
        <section className="sct_search">
          <div className="cnt_form">
            <h2>카풀/택시팟을 찾아볼까요?</h2>
            <form onSubmit={searchTrips}>
              <input type="text" id="departure" placeholder="출발지" />
              <input
                type="text"
                id="arrival"
                className="search-input"
                placeholder="도착지"
              />
              <input type="date" id="tripDate" />
              <button type="submit">검색</button>
            </form>
            <div className="wrap">
              <button
                className={`btn_filter ${
                  activeFilter === "전체" ? "active" : ""
                }`}
                onClick={() => filterTrips("전체")}
              >
                전체
              </button>
              <button
                className={`btn_filter ${
                  activeFilter === "탑승자" ? "active" : ""
                }`}
                onClick={() => filterTrips("탑승자")}
              >
                탑승자
              </button>
              <button
                className={`btn_filter ${
                  activeFilter === "운전자" ? "active" : ""
                }`}
                onClick={() => filterTrips("운전자")}
              >
                운전자
              </button>
              <button
                className={`btn_filter ${
                  activeFilter === "택시" ? "active" : ""
                }`}
                onClick={() => filterTrips("택시")}
              >
                택시
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsPostingModalOpen(true)}
            className="btn_write"
          >
            카풀 요청하기
          </button>
        </section>
        <section className="sct_board">
          <h3>최근 게시물</h3>
          <div className="cnt_board">
            {filteredTrips.map((trip, index) => (
              <div
                key={index}
                className="card"
                onClick={() => handleEditClick(trip)}
              >
                <div className="row1">
                  <div className="profile"></div>
                  <div className="wrap">
                    <div className="user">가나다</div>
                    <div className="type">{trip.type} · 30분 전</div>
                  </div>
                  <div className="manner">{trip.manner}</div>
                </div>
                <div className="row2">
                  <div className="route">{trip.route}</div>
                </div>
                <div className="row3">
                  <div className="time">
                    <img src="/img/clock.png" alt="clock" />
                    {trip.time}
                  </div>
                  <div className="genderType">
                    <img src="/img/person.png" alt="person" />
                    {trip.gender}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <ModalPosting
        isOpen={isPostingModalOpen}
        onClose={() => setIsPostingModalOpen(false)}
        onSubmit={handlePostSubmit}
      />
      <ModalEditor
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editData={selectedTrip}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
