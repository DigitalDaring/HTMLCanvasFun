const Track = function (name, url, buffer) {
    this.Name = name;
    this.TrackUrl = url
    this.BufferData = buffer


    this._settings = {};

    this.OnBeat = function (callback) {
        this._settings.OnBeat = callback || function (hzGroup, value) { };
    }

    this.SetBufferSource = function (bufferSource) {
        this._settings.Source = bufferSource;
    }

    this.SetGainNode = function (gainNode) {
        var $this = this;

        $this._settings.GainNode = gainNode;

        $this.Mute = function () {
            $this._settings.GainNode.gain.value = 0;
        }

        $this.UnMute = function () {
            $this._settings.GainNode.gain.value = 1;
        }
    }

    this.SetAnalyzer = function (analyzer) {
        var $this = this;

        $this._settings.Analyzer = analyzer;
    }

    this.Play = function (loop) {
        if (this._settings.Source) {
            this._settings.Source.loop = loop;
            this._settings.Source.start(0);
        }
    }

    this.Stop = function(){
        if(this._settings.Source)
        {
            this._settings.Source.stop();
        }
    }

    this._analyzeFrame = function (historyLength, beatThreshold, beatResolution) {

        var $this = this;
        $this._settings.History = $this._settings.History || [];

        if ($this._settings.History.length >= historyLength) {
            this._settings.History.splice(0, 1);
        }

        if ($this._settings.Analyzer) {

            var data = new Uint8Array(beatResolution);
            var numberOfBars = beatResolution;
            $this._settings.Analyzer.getByteFrequencyData(data);
            var chunkSize = Math.floor(data.length / numberOfBars);
            var beatList = [];

            for (var i = 0; i < numberOfBars; i++) {
                let sum = 0;

                for (var j = 0; j < chunkSize; j++) {
                    sum += data[(i * chunkSize) + j];
                }

                var avg = sum / chunkSize;

                beatList.push(avg);

                var historyTotal = 0;
                for (var k = 0; k < $this._settings.History.length; k++) {
                    historyTotal += $this._settings.History[k].Averages[i];
                }

                var historyAvg = Math.floor(historyTotal / $this._settings.History.length);
                var valueToBeat = historyAvg * beatThreshold + historyAvg;
                if (avg > valueToBeat) {
                    $this._settings.OnBeat(i, avg);
                }
            }

            $this._settings.History.push({
                Averages: beatList
            });


        }
    }
};

export default Track;