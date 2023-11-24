import logoImage from "../../../assets/logo/logo.png"


const Footer = () => {
    return (
        <div>
            <footer className="footer p-10 bg-base-200 text-base-content">
                <nav>
                    <header className="footer-title">Forum</header>
                    <a className="link link-hover">Coding</a>
                    <a className="link link-hover">Development</a>
                    <a className="link link-hover">Discussion</a>
                </nav>
                <nav>
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <nav>
                    <img src={logoImage} alt="" />
                    <p className="text-2xl font-bold">Byte Talks</p>
                    <p>Copyright © 2023 - All right reserved by Byte Talks</p>
                </nav>
            </footer>

        </div>
    );
};

export default Footer;