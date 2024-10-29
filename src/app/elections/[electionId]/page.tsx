const Home = ({ params }: { params: { electionId: string } }) => {
  return (
    <div className="flex items-center justify-center h-[80vh] content-center">
      <div>
        <p> Elections {params.electionId}</p>
      </div>
    </div>
  );
};

export default Home;
