import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Oval
      height={130}
      width={130}
      color="#4058df"
      ariaLabel="oval-loader-spinner"
      secondaryColor="#9e12a3"
      strokeWidth={7}
      strokeWidthSecondary={7}
    />
  );
};

export default Loader;
