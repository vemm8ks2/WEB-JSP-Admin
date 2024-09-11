type HeaderProps = {
  name: string;
};

const Header = ({ name }: HeaderProps) => {
  return <h1 className="text-2xl font-bold text-gray-700">{name}</h1>;
};

export default Header;
