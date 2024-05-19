import React, { useState } from 'react';
import './dashboard.css';
import SearchButton from './SearchButton';

function PreviousEntries() {
  const [entries, setEntries] = useState(getJournalEntries());

  function addJournalEntry() {
    const entry = getJournalEntries();
    setEntries([...entries, entry]);
  }

  function getJournalEntries() {
    return [
      { id: 1, date: '2022-01-01', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum leo id sapien pulvinar, ac tempus ligula lacinia. Nunc ultrices odio magna, nec consequat purus mattis placerat. Donec vel libero erat. Fusce eu lobortis justo. Maecenas commodo purus eget tellus sagittis, in congue magna condimentum. In in dignissim metus. Quisque porttitor luctus nisi id aliquam. Donec non faucibus tortor, ac ullamcorper lectus. Nullam suscipit vulputate lorem, eu pharetra nulla vestibulum at. Sed eu vehicula tellus.    ', emotion: 'happy', title: 'Today was a good day' },
      { id: 2, date: '2022-01-02', text: 'Ut gravida lectus porta neque ultrices mattis. Fusce imperdiet imperdiet risus et fermentum. Donec ante eros, cursus quis ullamcorper ut, pulvinar quis elit. Sed viverra consequat tellus, ullamcorper facilisis odio molestie vehicula. Duis sed nisl vel quam ullamcorper ultricies. In et elit et nulla ultrices porttitor iaculis dignissim urna. Donec in erat in erat imperdiet pretium. Donec egestas lobortis justo sed tempor. Maecenas et risus mauris. Proin rhoncus faucibus tellus, vel pretium erat. Aliquam interdum sem at est porttitor, et scelerisque velit blandit.', emotion: 'sad', title: 'Today was bad' },
      { id: 3, date: '2022-01-03', text: 'TFusce convallis, tortor porta fermentum tempor, est arcu posuere mi, posuere sollicitudin massa nibh non lectus. Phasellus sollicitudin pellentesque urna, vel porta tortor pharetra ornare. Nulla quis faucibus ipsum. Vivamus id est felis. Donec id sagittis leo. Ut condimentum vulputate turpis in pretium. Nulla in sapien turpis. Ut nec sem molestie, bibendum sem vitae, ullamcorper ante. Aenean pretium arcu et augue euismod congue.', emotion: 'excited', title: 'Today was alright' },
      // Add more entries as needed
      { id: 4, date: '2022-01-01', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum leo id sapien pulvinar, ac tempus ligula lacinia. Nunc ultrices odio magna, nec consequat purus mattis placerat. Donec vel libero erat. Fusce eu lobortis justo. Maecenas commodo purus eget tellus sagittis, in congue magna condimentum. In in dignissim metus. Quisque porttitor luctus nisi id aliquam. Donec non faucibus tortor, ac ullamcorper lectus. Nullam suscipit vulputate lorem, eu pharetra nulla vestibulum at. Sed eu vehicula tellus.    ', emotion: 'happy', title: 'Today was a good day' },
      { id: 5, date: '2022-01-02', text: 'Ut gravida lectus porta neque ultrices mattis. Fusce imperdiet imperdiet risus et fermentum. Donec ante eros, cursus quis ullamcorper ut, pulvinar quis elit. Sed viverra consequat tellus, ullamcorper facilisis odio molestie vehicula. Duis sed nisl vel quam ullamcorper ultricies. In et elit et nulla ultrices porttitor iaculis dignissim urna. Donec in erat in erat imperdiet pretium. Donec egestas lobortis justo sed tempor. Maecenas et risus mauris. Proin rhoncus faucibus tellus, vel pretium erat. Aliquam interdum sem at est porttitor, et scelerisque velit blandit.', emotion: 'sad', title: 'Today was bad' },
      { id: 6, date: '2022-01-03', text: 'TFusce convallis, tortor porta fermentum tempor, est arcu posuere mi, posuere sollicitudin massa nibh non lectus. Phasellus sollicitudin pellentesque urna, vel porta tortor pharetra ornare. Nulla quis faucibus ipsum. Vivamus id est felis. Donec id sagittis leo. Ut condimentum vulputate turpis in pretium. Nulla in sapien turpis. Ut nec sem molestie, bibendum sem vitae, ullamcorper ante. Aenean pretium arcu et augue euismod congue.', emotion: 'excited', title: 'Today was alright' },
      // Add more entries as needed
    ];
  }

  return (
    <div className="previous-entries-container">
      <div className="previous-entries-header">
        <h1 className="previous-entries-title">Previous Entries</h1>
        <SearchButton />
      </div>
      <div className="all-entries-container">
        {entries.map(entry => (
          <div key={entry.id} className="entry">
            <div className="entry-header">
              <p className="entry-title">{entry.title}</p>
              <p className="entry-emotion">Emotion: {entry.emotion}</p>
            </div>
            <p className="entry-text">{entry.text}</p>
            <b className="entry-date">{entry.date}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviousEntries;