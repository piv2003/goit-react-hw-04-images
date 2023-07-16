import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Oval
      height={130}
      width={130}
      color="#4058df"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#162aa6"
      strokeWidth={4}
      strokeWidthSecondary={4}
    />
  );
};

export default Loader;
