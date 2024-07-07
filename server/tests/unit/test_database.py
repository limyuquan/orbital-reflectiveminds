from models import User, UserEntry
from datetime import datetime, timezone, date
from sqlalchemy.exc import IntegrityError, PendingRollbackError
import pytest

#testing success entries
def test_new_user(session):
    '''
    GIVEN a new user model
    WHEN new user created
    CHECK 
    '''
    user = User(
        userId=1,  # Specify the userId (optional depending on your database setup)
        username="testuser",
        password="password",
        email="test@example.com",
        created_at=datetime.now(timezone.utc),
        last_entry=None  # Optional, depending on your model definition
    )

    session.add(user)
    session.commit()

    queried_user = session.query(User).filter_by(username="testuser").first()

    assert queried_user.userId == 1  # Ensure userId matches what you specified
    assert queried_user.username == "testuser"
    assert queried_user.password == "password"
    assert queried_user.email == "test@example.com"
    assert queried_user.created_at is not None
    assert queried_user.last_entry is None

    session.rollback()


def test_user_entry(session):
    '''
    GIVEN a new user entry
    WHEN new user entry created
    CHECK 
    '''
    userEntry = UserEntry(
        entryId=1,
        userId=1,
        title="test-user-entry",
        body="test-body",
        emotions="emotion",
        startDate=date(2024, 7, 10),
        journal_tags="tags",
        bookmark=False
    )

    session.add(userEntry)
    session.commit()

    queried_user_entry = session.query(UserEntry).filter_by(userId=1).first()

    assert queried_user_entry is not None
    assert queried_user_entry.entryId == 1
    assert queried_user_entry.userId == 1
    assert queried_user_entry.title == "test-user-entry"
    assert queried_user_entry.body == "test-body"
    assert queried_user_entry.emotions == "emotion"
    assert queried_user_entry.startDate is not None
    assert queried_user_entry.journal_tags == "tags"
    assert queried_user_entry.bookmark == False

    session.rollback() 


#test failures
@pytest.mark.xfail(raises=IntegrityError)
def test_user_entry_no_title(session):
    '''
    GIVEN a new user entry model
    WHEN new user entry created without title
    CHECK IntegrityError is raised due to NOT NULL constraint
    '''
    try:
        userEntry = UserEntry(
            entryId=1,
            userId=1,  # Ensure a valid userId here based on your setup
            title=None,  # This will cause IntegrityError due to NOT NULL constraint
            body="test-body",
            emotions="emotion",
            startDate=date.today(),
            journal_tags="tags",
            bookmark=False
        )
        session.add(userEntry)
        session.commit()
    except IntegrityError as e:
        assert "NOT NULL constraint failed: userEntry.title" in str(e)
    except PendingRollbackError as e:
        session.rollback()
        raise e  
    
    # Always ensure to rollback changes to maintain a clean state
    session.rollback()



@pytest.mark.xfail(raises=IntegrityError)
def test_user_no_email(session):
    '''
    GIVEN a new user model
    WHEN new user created without email
    CHECK IntegrityError is raised due to NOT NULL constraint
    '''
    try:
        user = User(
            userId=1,  # Optional depending on your database setup
            username="testuser",
            password="password",
            email=None,  # This will cause IntegrityError due to NOT NULL constraint
            created_at=datetime.now(),
            last_entry=None
        )
        session.add(user)
        session.commit()
    except IntegrityError as e:
        assert "NOT NULL constraint failed: users.email" in str(e)
    except PendingRollbackError as e:
        # Handle PendingRollbackError here if necessary
        session.rollback()
        raise e  # Re-raise the exception if needed

    # Always ensure to rollback changes to maintain a clean state
    session.rollback()


#test reference?
def test_user_entry_foreign_key(session):
    # Create a User instance
    user = User(
        username="testuser",
        password="password",
        email="test@example.com",
        created_at=datetime.now(timezone.utc),
        last_entry=None
    )
    session.add(user)
    session.commit()
    
    # Create a UserEntry instance referencing the created User
    user_entry = UserEntry(
        userId=user.userId,
        title="Test Entry",
        body="Test Body",
        emotions="Happy",
        startDate=date(2024, 7, 10),
        journal_tags="Testing",
        bookmark=False
    )
    session.add(user_entry)
    session.commit()
    
    # Query and verify the foreign key relationship
    retrieved_entry = session.query(UserEntry).filter_by(entryId=user_entry.entryId).first()
    
    assert retrieved_entry is not None
    assert retrieved_entry.user is not None
    assert retrieved_entry.user.userId == user.userId