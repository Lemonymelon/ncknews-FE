import React, { Component } from "react";

class SortBy extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="sortByCreated_at">Recency</label>
          <input
            onClick={handleChange}
            type="radio"
            name="sortRadioButtons"
            value="created_at"
            id="sortByCreated_at"
            defaultChecked
            className="radioButton"
          />
          <label htmlFor="sortByCreated_at">Votes</label>
          <input
            onClick={handleChange}
            type="radio"
            name="sortRadioButtons"
            value="votes"
            id="sortByVotes"
          />
          <label htmlFor="sortByCreated_at">Comments</label>
          <input
            onClick={handleChange}
            type="radio"
            name="sortRadioButtons"
            value="comment_count"
            id="sortByComments"
          />
        </form>
      </div>
    );
  }
}

export default SortBy;
