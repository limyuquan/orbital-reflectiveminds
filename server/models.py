from sqlalchemy import Column, ForeignKey, Integer, String, Text, Date, Boolean, TIMESTAMP, create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from datetime import datetime
import pytest

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    userId = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False, server_default='CURRENT_TIMESTAMP')
    last_entry = Column(TIMESTAMP)

    entries = relationship('UserEntry', backref='user')

class UserEntry(Base):
    __tablename__ = 'userEntry'
    entryId = Column(Integer, primary_key=True, autoincrement=True)
    userId = Column(Integer, ForeignKey('users.userId'), nullable=False)
    title = Column(String(255), nullable=False)
    body = Column(Text)
    emotions = Column(String(100))
    startDate = Column(Date)
    journal_tags = Column(String(255))
    bookmark = Column(Boolean, default=False)