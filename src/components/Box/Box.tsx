type BoxProps = {
  children: React.ReactNode;
};

export const Box = ({ children }: BoxProps) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};
