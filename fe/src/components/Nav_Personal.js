import './Nav_Personal.css';
import { Link } from 'react-router-dom';



export function PersonalNav({ onClose, username }) {
	return (
		<div id="PersonalNav">
			<button className="close-button" onClick={onClose}>&times;</button>
			<h2>{username}님의 프로필</h2>
			<Link to='/mypage'>마이페이지</Link>
			<Link to='/settings'>설정</Link>
			<Link to='/messages'>메시지</Link>
			<Link to='/history'>거래 내역</Link>
			{/* <nav>
				<ul>
					<li><a href="/mypage">Mypage</a></li>
					<li><a href="/settings">설정</a></li>
					<li><a href="/messages">메시지</a></li>
					<li><a href="/history">거래 내역</a></li>
				</ul>
			</nav> */}
		</div>
	);
}