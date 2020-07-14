require 'test_helper'

class WeatherControllerTest < ActionDispatch::IntegrationTest
  test "should get get" do
    get weather_get_url
    assert_response :success
  end

end
