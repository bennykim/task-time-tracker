type ContainerProps = {
  show: boolean;
  position: Position;
  children?: React.ReactNode;
};

export const SideBar = ({ show, position, children }: ContainerProps) => {
  return (
    <div className={`sidebar message ${position} ${show ? "active" : ""}`}>
      {children}
    </div>
  );
};

type HeaderProps = {
  title: string;
  onClose: () => void;
};

const Header = ({ title, onClose }: HeaderProps) => {
  return (
    <div className="message-header">
      <p className="has-text-primary-100">{title}</p>
      <button className="delete" onClick={onClose} />
    </div>
  );
};

type BodyProps = {
  children: React.ReactNode;
};

const Body = ({ children }: BodyProps) => {
  return <div className="message-body">{children}</div>;
};

SideBar.Header = Header;
SideBar.Body = Body;
