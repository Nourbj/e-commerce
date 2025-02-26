const Search = () => {
    return (
      <div className="col-sm-10 d-flex" style={{ marginTop: '30px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          disabled
          style={{ flex: 10, marginRight: '10px' }} 
        />
        
      </div>
    );
  };
  
  export default Search;
  