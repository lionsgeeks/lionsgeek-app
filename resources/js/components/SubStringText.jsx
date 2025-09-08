const SubstringText = ({ text, length }) => {
    return <>{text.length > length ? `${text.substring(0, length)}...` : `${text}`}</>;
};

export default SubstringText;
