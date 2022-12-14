class RandomPicker extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isRunning: false,
      currentChoice: '' };


    this.interval = null;
    this.intervalDuration = 25;
    this.duration = 1000;

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.pickChoice = this.pickChoice.bind(this);
    this.setChoice = this.setChoice.bind(this);
  }

  start() {
    clearInterval(this.interval);
    this.interval = setInterval(this.setChoice, this.intervalDuration);
    this.setState({ isRunning: true });
    setTimeout(() => {
      if (this.state.isRunning) {
        this.stop();
      }
    }, this.duration);
  }

  stop() {
    clearInterval(this.interval);
    this.setState({ isRunning: false });
  }

  reset() {
    clearInterval(this.interval);
    this.setState({ isRunning: false, currentChoice: '' });
  }

  pickChoice() {
    const { items } = this.props;
    const choice = items[Math.floor(Math.random() * items.length)];
    return choice;
  }

  setChoice() {
    this.setState({ currentChoice: this.pickChoice() });
  }

  render() {
    const { isRunning, currentChoice } = this.state;

    return /*#__PURE__*/(
      React.createElement("div", { className: "RandomPicker" }, /*#__PURE__*/
      React.createElement(RandomPickerChoice, { choice: currentChoice }), /*#__PURE__*/
      React.createElement(RandomPickerControls, {
        isRunning: isRunning,
        hasChoice: currentChoice.trim().length > 0,
        start: this.start,
        stop: this.stop,
        reset: this.reset })));



  }}


RandomPicker.propTypes = {
  items: PropTypes.array,
  duration: PropTypes.number };


class RandomPickerChoice extends React.PureComponent {
  render() {
    const { choice } = this.props;
    const content = choice.trim().length > 0 ? choice : '?';

    return /*#__PURE__*/(
      React.createElement("div", { className: "RandomPicker__choice" }, /*#__PURE__*/
      React.createElement("span", { className: "RandomPicker__choiceItem" }, content)));


  }}


RandomPickerChoice.propTypes = {
  choice: PropTypes.string };


class RandomPickerControls extends React.PureComponent {
  render() {
    const {
      isRunning,
      hasChoice,
      start,
      stop,
      reset } =
    this.props;

    return /*#__PURE__*/(
      React.createElement("div", { className: "RandomPicker__controls" }, /*#__PURE__*/
      React.createElement("button", {
        class: `RandomPicker__button ${isRunning && 'RandomPicker__button--stop'}`,
        onClick: isRunning ? stop : start },

      isRunning ? 'stop' : 'start'), /*#__PURE__*/

      React.createElement("button", {
        disabled: isRunning || !hasChoice,
        class: "RandomPicker__button RandomPicker__button--reset",
        onClick: reset }, "")));





  }}


RandomPickerControls.propTypes = {
  isRunning: PropTypes.bool,
  hasChoice: PropTypes.bool,
  start: PropTypes.func,
  stop: PropTypes.func,
  reset: PropTypes.func };


const namesList = [
'Aleksandra Bobak',
'Micha?? Buczko',
'Miko??aj D??wiga??',
'Adam Foint',
'Anna Gajewska',
'Borys Hajdamowicz',
'Martyna Jaroszy??ska',
'Karol Jastak',
'Micha?? Ja??kiewicz',
'Lena Kalinowska',
'Miko??aj Klimkowicz',
'Joanna Kru??li??ska',
'Amelia Kwiatkowska',
'Adam ??ochnicki',
'Bartosz Ma??y',
'Laura Nuszczy??ska',
'Krzysztof Skorasi??ski',
'Zuzanna Sztark',
'Wiktoria Szych',
'Zuzanna Wi??c??awska',
'Karolina Zygmunt',];


ReactDOM.render( /*#__PURE__*/
React.createElement(RandomPicker, { items: namesList }),
document.getElementById('random-picker'));