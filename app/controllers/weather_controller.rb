class WeatherController < ApplicationController
  def index
    wd = ["日", "月", "火", "水", "木", "金", "土"]
    date = "%-m/%-d"
    time = DateTime.now
    today = Date.today
    @now = time.strftime("#{date}（#{wd[time.wday]}） %-H:%M")
    @today = today.strftime("#{date}（#{wd[today.wday]}）")
    @tomorrow = today.since(1.days).strftime("#{date}（#{wd[today.since(1.days).wday]}）")
  end
end
