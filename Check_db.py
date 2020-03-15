import sqlalchemy
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.types import Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
from pprint import pprint
#import datetime


engine = create_engine("sqlite:///db/bellybutton.sqlite", echo=False)

inspector = inspect(engine)

table_names = inspector.get_table_names()
print(table_names)

schema = inspector.get_columns("samples") #samples, sample_metadata
print(schema)

# for table in table_names:
#     print(table + ":")
    #columns = inspector.get_columns(table)
    #pprint(columns)

# print(engine.execute("SELECT date FROM dow LIMIT 5").fetchall())

# Base = declarative_base()


# class Dow(Base):
#     __tablename__ = "dow"
#     id = Column(String, primary_key=True)
#     quarter = Column(Integer)
#     stock = Column(String)
#     date = Column(Date)
#     open_price = Column(Float)
#     high_price = Column(Float)
#     low_price = Column(Float)
#     close_price = Column(Float)
#     volume = Column(Integer)
#     percent_change = Column(Float)


# session = Session(engine)

# # * Find the average open, average high, average low and average close for all stocks in the Month of May

# cmd = (
#     session.query(
#         Dow.stock,
#         func.avg(Dow.open_price),
#         func.avg(Dow.high_price),
#         func.avg(Dow.low_price),
#         func.avg(Dow.close_price),
#     )
#     .filter(Dow.date.between(datetime.date(2011, 5, 1), datetime.datetime(2011, 6, 1)))
#     .group_by(Dow.stock)
# )

# print(cmd)
# print(cmd.all())
