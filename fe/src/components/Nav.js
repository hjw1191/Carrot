import './Nav.css';
import { Link } from 'react-router-dom';


export function Nav({ onClose, userName }) {
	return (
		<nav>
			<button className="close-button" onClick={onClose}>&times;</button>
			<h2>{userName}님의 프로필</h2>
			<Link to='/mypage'>마이페이지</Link>
			<Link to='/settings'>설정</Link>
			<Link to='/messages'>메시지</Link>
			<Link to='/history'>거래 내역</Link>
		</nav>
	);
}